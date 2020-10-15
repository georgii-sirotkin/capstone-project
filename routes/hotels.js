const { Router } = require('express');
const { UNAUTHORIZED, OK } = require('http-status-codes');
const Hotel = require('../models/Hotel');

const router = Router();

router.get('/', async (req, res) => {
  const hotels = await Hotel.findAll();
  return res.status(OK).json(hotels);
});

module.exports = router;
