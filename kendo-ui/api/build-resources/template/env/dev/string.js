const variables = {
    db: {
        database: "fee",
        host: "192.168.99.100",
        // 參考 - https://itw01.com/H7XEKHF.html
        // For windows - host is "ip for docker tool linux vm"
        port: 3308,
        user: "root",
        password: "781026",
        multipleStatements: true,
        debug: false,
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
