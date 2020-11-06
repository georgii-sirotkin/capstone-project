const { Router } = require('express');
const { UNAUTHORIZED, OK } = require('http-status-codes');
const passport = require('../config/passport').default;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const isAuthenticated = require('../config/passport').isAuthenticated;

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

router.post('/logout', isAuthenticated, (req, res) => {
  req.logout();
  return res.status(OK).end();
});

router.post('/register', async (req, res, next) => {
  // @ToDo add validation

  try {
    const user = await User.create({
      email: req.body.email,
      isAdmin: false,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    req.login(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.status(OK).json(user);
    });
  } catch (error) {
    next(error);
  }
});

router.get('/check-email/:email', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      }
    });

    return res.json({ isUnique: user === null });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
