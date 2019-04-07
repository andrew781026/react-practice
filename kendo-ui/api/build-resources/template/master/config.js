/**
 * <%= constant.warning %>
 */

const config = {
    env: <%= JSON.stringify(env) %>,
    jwt: {
        token_secret: <%= JSON.stringify(jwt.token_secret) %>,
        token_expires_in_sec: <%= jwt.token_expires_in_sec %>,
        token_algorithm : <%= JSON.stringify(jwt.token_algorithm) %>,
    },
    redis: {
        host: <%= JSON.stringify(redis.host) %>,
        port: <%= redis.port %>,
    }
};

module.exports = config;
