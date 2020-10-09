const { Router } = require('express');
const { UNAUTHORIZED, OK } = require('http-status-codes');
const passport = require('../config/passport').default;

const router = Router();

router.get('/me', (req, res) => {
  if (req.user) {
    return res.status(OK).json(req.user);
  }

  return res.status(UNAUTHORIZED).end();
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: info.message })
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      const userData = { ...user.toJSON() };
      delete userData.password;
      return res.status(OK).json(userData);
    });
  })(req, res, next);
});

module.exports = router;
