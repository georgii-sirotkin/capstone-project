const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { UNAUTHORIZED } = require('http-status-codes');

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(undefined, user);
  } catch (error) {
    done(error, null);
  };
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({
      attributes: { include: ['password'] },
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return done(err);
      }

      if (result) {
        return done(undefined, user);
      }

      return done(undefined, false, { message: 'Invalid email or password.' });
    });
  } catch (err) {
    return done(err);
  }
}));

/**
 * Login Required middleware.
 */
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
    
  return res.status(UNAUTHORIZED).end()
}

module.exports = {
  isAuthenticated,
  default: passport,
};
