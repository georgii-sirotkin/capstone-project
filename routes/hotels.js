const { Router } = require('express');
const { OK } = require('http-status-codes');
const Hotel = require('../models/Hotel');

const router = Router();

router.get('/', async (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id, {
      include: [
        Hotel.associations.thumbnailPhoto,
        Hotel.associations.address,
        Hotel.associations.amenities,
      ],
      rejectOnEmpty: true
    });

    return res.status(OK).json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
