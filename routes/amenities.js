const { Router } = require('express');
const { OK } = require('http-status-codes');
const Amenity = require('../models/Amenity');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const amenities = await Amenity.findAll();
    return res.status(OK).json(amenities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;