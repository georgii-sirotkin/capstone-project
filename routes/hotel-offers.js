const { Router } = require('express');
const { Client } = require("@googlemaps/google-maps-services-js");
const { OK, BAD_REQUEST } = require('http-status-codes');
const amadeus = require('../amadeus');

const router = Router();

router.get('/', async (req, res, next) => {
  const searchString = req.query.search || 'Toronto, Canada';
  const client = new Client({});

  try {
    const geocoderResponse = await client.geocode({
      params: {
        address: searchString,
        key: process.env.GOOGLE_MAPS_API_KEY,
      }
    });

    const geocodeData = geocoderResponse.data;

    if (geocodeData.status !== 'OK') {
      return res.status(BAD_REQUEST).send();
    }

    const { lat: latitude, lng: longitude } = geocodeData.results[0].geometry.location;

    const response = await amadeus.shopping.hotelOffers.get({
      latitude,
      longitude,
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
