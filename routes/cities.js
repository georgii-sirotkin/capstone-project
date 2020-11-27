const { Router } = require('express');
const { OK } = require('http-status-codes');
const City = require('../models/City');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const cities = await City.findAll();
    return res.status(OK).json(cities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
