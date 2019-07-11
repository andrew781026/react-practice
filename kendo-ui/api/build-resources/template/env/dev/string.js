const variables = {
    db: {
        host: '192.168.44.128',
        user: 'system',
        password: 'qwer4321',
        database: 'TACTDB',
        port: 1521,
        multipleStatements: true,
        charset: 'utf8',
        timezone : 'UTC'
    },
    redis: {
        host: "192.168.99.100",
        port: 6380,
    },
    env: 'dev',
    jwt: {
        token_secret: "fee",
        token_expires_in_sec: 60 * 60,
        token_algorithm: 'HS512',
    },
};

module.exports = variables;
