const { Router } = require('express');
const { OK } = require('http-status-codes');
const User = require('../../models/User');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(OK).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
