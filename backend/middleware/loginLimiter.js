const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` (here, per minute)
    message: { error: 'Too many login attempts from this IP, please try again after a minute' },
    handler: (req, res, next, options) => {
        logEvents(`Too many login attempts: ${req.ip}`, 'loginLimiter.log');
        res.status(options.statusCode).json(options.message);
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = loginLimiter;