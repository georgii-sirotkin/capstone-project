const { Router } = require('express');
const { FORBIDDEN } = require('http-status-codes')
const { isAuthenticated } = require('../config/passport');
const userRouter = require('./admin/users');

const router = Router();

router.use('/', isAuthenticated, function(req, res, next) {
    const user = req.user;

    if (user.isAdmin) {
        return next();
    }
    
    return res.status(FORBIDDEN).end()
});

router.use('/users', userRouter);

module.exports = router;
