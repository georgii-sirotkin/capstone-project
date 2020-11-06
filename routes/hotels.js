const { Router } = require('express');
const { OK } = require('http-status-codes');
const Hotel = require('../models/Hotel');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      include: [
        Hotel.associations.thumbnailPhoto,
        Hotel.associations.address,
        Hotel.associations.amenities,
      ]
    });
    return res.status(OK).json(hotels);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
