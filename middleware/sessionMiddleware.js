const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({ url: process.env.REDIS_URL });

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
});

module.exports = sessionMiddleware;
