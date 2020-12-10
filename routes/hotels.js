const { Router } = require('express');
const { OK } = require('http-status-codes');
const { fn, col } = require('sequelize');
const Hotel = require('../models/Hotel');

const router = Router();

router.get('/', async (req, res, next) => {
  const addressWhereConditions = {};

  if (req.query.city) {
    addressWhereConditions.city = req.query.city;
  }

  try {
    const hotels = await Hotel.findAll({
      attributes: { 
        include: [
          [fn('COUNT', col('reviews.id')), 'reviewsCount'],
          [fn('SUM', col('reviews.rating')), 'ratingSum'],
          [fn('MIN', col('rooms.price')), 'minPrice'],
        ] 
      },
      include: [
        Hotel.associations.thumbnailPhoto,
        Hotel.associations.amenities,
        {
          association: Hotel.associations.reviews,
          required: false,
          attributes: [],
        },
        {
          association: Hotel.associations.rooms,
          required: false,
          attributes: [],
        },
        {
          association: Hotel.associations.address,
          where: addressWhereConditions,
        },
      ],
      group: ['id', col('amenities.id')],
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
        Hotel.associations.reviews,
        Hotel.associations.rooms,
      ],
      rejectOnEmpty: true
    });

    return res.status(OK).json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
