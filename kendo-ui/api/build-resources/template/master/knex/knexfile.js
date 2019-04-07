/*
 <%= constant.warning %>
 */

module.exports = {
    <%= NODE_ENV %>: {
        client: 'mysql',
        connection: {
            host: '<%= db.host %>',
            user: '<%= db.user %>',
            password: '<%= db.password %>',
            database: '<%= db.database %>',
            port: <%= db.port %>,
            multipleStatements: <%= db.multipleStatements %>,
            charset: 'utf8',
            timezone : 'UTC'
        },
        debug: <%= db.debug %>
    }
};
