const { Router } = require('express');
const { OK } = require('http-status-codes');
const amadeus = require('../amadeus');

const router = Router();

router.get('/', async (req, res, next) => {
  const cityCode = 'PAR';

  try {
    const response = await amadeus.shopping.hotelOffers.get({
      cityCode
    });

    return res.status(OK).json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
