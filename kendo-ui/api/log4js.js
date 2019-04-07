const jsonLayout = require('log4js-json-layout');
const addRequestId = require('express-request-id')();
const {maskFieldReplacer} = require('./utils/jsonStringifyReplacer');
const config = require('./gen/config');

function initLog4js({app, logger, log4js, port}) {
    /* Block for logging setup */
    log4js.addLayout('json', jsonLayout);
    let appenders = {
        console: {type: 'console'},
        accessLog: {type: 'dateFile', filename: `logs/access-${port}.log`},
        errorLog: {type: 'dateFile', filename: `logs/error-${port}.log`},
        logs: {type: 'logLevelFilter', appender: 'accessLog', level: 'info'},
        errors: {type: 'logLevelFilter', appender: 'errorLog', level: 'error'},
    };
    let defaultAppenders = ['console', 'logs', 'errors', 'alerts'];
    log4js.configure({
        appenders,
        categories: {
            default: {appenders: defaultAppenders, level: (config.logLevel || 'debug')},
        },
    });
    app.set('trust proxy', 'loopback'); // set trust proxy for get real ip
    app.use(addRequestId); // Create uuid for a request, can be retrieved by using req.id
    app.use(log4js.connectLogger(logger, {
        level: log4js.levels.INFO, format: (req, res, format) => {
            return format(`[:remote-addr] :method :url :status`);
        }
    }));
    app.use(function (req, res, next) {
        //- Log request body, but don't log password (using maskFieldReplacer)
        logger.debug(`[${req.id}] - ${JSON.stringify(req.body, maskFieldReplacer.bind(this, ["password"]))}`);
        next();
    });
}

module.exports = {initLog4js};