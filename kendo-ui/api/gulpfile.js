const gulp = require('gulp-help')(require('gulp'));
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const template = require('gulp-template');
const docker = require('./docker');
const fs = require('fs');
const {exec} = require('child_process');

/**
 *Basic parameters
 */
const ENVIRONMENT = (argv.env || argv.e || 'dev').toLowerCase();
const _node_env_mapping = {
    dev_windows: 'development',
    dev: 'development',
    stg: 'staging',
    prod: 'production'
};
const NODE_ENV = _node_env_mapping[ENVIRONMENT];
const SET_NODE_ENV = 'NODE_ENV=' + NODE_ENV + ' ';

let ISTEST = (argv.test || argv.t);

console.log(`ENVIRONMENT: ${ENVIRONMENT}`);

const attachProcessToOutput = function (process) {
    process.stdout.on("data", (data) => {
        console.log(data.toString());
    });
    process.stderr.on("data", (data) => {
        console.error(data.toString());
    });
};

gulp.task("setup", "setup for given environment, options: -e (environment)", function (cb) {
    runSequence('compile-template', 'build-container', cb);
});

gulp.task("compile-template", "Compile files under templates/master with given environment, options: -e (environment)", function (cb) {
    let environmentStringValues = require(`./build-resources/template/env/${ENVIRONMENT}/string.js`);
    let constantStringValues = require('./build-resources/template/env/constant.js');

    gulp.src('build-resources/template/master/**/*', {base: 'build-resources/template/master/'})
        .pipe(template(Object.assign(environmentStringValues, constantStringValues, {ENVIRONMENT, NODE_ENV}), {
            interpolate: /<%=([\s\S]+?)%>/g //Ignore ES6 syntax ${} replacement
        }))
        .pipe(gulp.dest('./gen/'))
        .on('end', function () {
            cb();
        })
});

gulp.task("build-container", "Build containers from generated docker-compose.yml file", function (cb) {
    docker
        .compose({composeFile: "./gen/docker/docker-compose.yml", projectName: 'FEE'})
        .then(cb)
        .catch((error) => {
            console.error(error);
        })
    ;
});

gulp.task("recreate-db", "Drop all tables in UECARE database and update them with knex", function (cb) {
    runSequence('_recreate-db', '_update-db', cb);
});

gulp.task('_recreate-db', "[Private] Drop and Recreate DB schema from knex", async function () {
    const Knex = require('knex');

    const knexConfig = ISTEST ? require('./gen/knex/knexfile').test : require('./gen/knex/knexfile')[NODE_ENV];
    let knex = Knex(knexConfig);

    await knex.raw(`DROP DATABASE ${knexConfig.connection.database};`);

    await knex.raw(`CREATE DATABASE ${knexConfig.connection.database};`);
    await knex.raw(`ALTER DATABASE ${knexConfig.connection.database} CHARACTER SET utf8 COLLATE utf8_general_ci;`);

    knex.destroy();
});

gulp.task("_update-db", "Update db schema using knex file", function (cb) {
    let cmd = ISTEST ? `update-test-db` : `update-db`;
    let env = ISTEST ? '' : SET_NODE_ENV;
    let process = exec(`npm run cross-env ${env}npm run ${cmd}`, cb);
    attachProcessToOutput(process);
});

const runSqlFile = async function (fileName) {
    const Knex = require('knex');

    const knexConfig = ISTEST ? require('./gen/knex/knexfile').test : require('./gen/knex/knexfile')[NODE_ENV];
    let knex = Knex(knexConfig);

    let file = fs.readFileSync(fileName);
    await knex.raw(file.toString());

    knex.destroy();
};

gulp.task("dump-dev_data", "set basic & test data to database", function () {
    runSequence('_dump-basic_data', '_dump-test_users', '_dump-test_data');
});

gulp.task("dump-data", "set basic & user data to database", function () {
    runSequence('_dump-basic_data', '_dump-users');
});

gulp.task("_dump-basic_data", "set basic data to database", async function () {
    await runSqlFile('./init/sql/uecare_init.sql');
});

gulp.task("_dump-test_data", "set test data to database", async function () {
    await runSqlFile('./init/sql/test_data.sql');
});
