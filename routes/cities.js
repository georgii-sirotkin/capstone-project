const { Router } = require('express');
const { OK } = require('http-status-codes');
const Address = require('../models/Address');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const cities = await Address.findAll({
      attributes: ['city', 'province'],
      group: ['city', 'province']
    });

    return res.status(OK).json(cities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
