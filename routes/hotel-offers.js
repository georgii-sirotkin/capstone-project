const { Router } = require('express');
const { OK } = require('http-status-codes');
const amadeus = require('../amadeus');

const router = Router();

router.get('/', async (req, res, next) => {
  const cityCode = req.query.city || 'YTO';

  try {
    const response = await amadeus.shopping.hotelOffers.get({
      cityCode
    });

    return res.status(OK).json(response.data);
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId: req.params.id
    });

    return res.status(OK).json(response.data);
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
});

module.exports = router;
