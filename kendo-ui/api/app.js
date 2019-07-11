const Knex = require('knex');
const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./gen/knex/knexfile')[process.env.NODE_ENV || 'development'];
const log4js = require('log4js');
const {Model, knexSnakeCaseMappers} = require('objection');
const app = express();
const port = process.argv[2] || 8888;

// DB Columns 駝峰轉換
// 參考資料 : https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
const newKnexConfig = {
    ...knexConfig,

    // If your columns are UPPER_SNAKE_CASE you can use
    // knexSnakeCaseMappers({ upperCase: true })
    ...knexSnakeCaseMappers({ upperCase: true })
};

// Initialize knex.
const knex = Knex(newKnexConfig);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

// HTTP:413 Request Entity Too Large. => express request 預設的最大上限 100 KB , 目前設定 100mb
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true}));

// allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,locale");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

    next();
});

app.use('/fee0404m', require('./router/fee0404m'));
app.use('/registorCustomer', require('./router/registorCustomer'));
app.use('/invoiceMaster', require('./router/invoiceMaster'));
app.use('/chargeSp', require('./router/chargeSp'));

const publicFolder = __dirname + '/public';
console.log('publicFolder=', publicFolder);

// set public folder as site root
app.use(express.static(publicFolder));

//error handler middleware
app.use(function (err, req, res, next) {  // do not remove next as the method signature matters...
    let status, error = {};

    if (!err.status) {
        status = 500;
        error = {
            title: err.title,
            message: err.message,
            stack: err.stack,
        }
    } else {
        status = err.status;
        error = {
            title: err.title,
            logMessage: err.logMessage,
            message: err.message,
            stack: err.stack,
            data: err.data
        }
    }

    let errLogMessage = err.logMessage || err.message || '';
    const logMessage = `[${req.id}][${req.ip}] ${req.method} ${req.url} ${status} ${JSON.stringify(error)}`;

    res.status(status).json(error);
});

const server = app.listen(port, () => {
    console.log('fee api listening at port %s', server.address().port);
});
