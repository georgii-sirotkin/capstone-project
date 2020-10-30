const { Router } = require('express');
const { OK } = require('http-status-codes');
const Hotel = require('../models/Hotel');

const router = Router();

router.get('/', async (req, res) => {
  const hotels = await Hotel.findAll({
    include: [
      Hotel.associations.thumbnailPhoto,
      Hotel.associations.address,
    ]
  });
  return res.status(OK).json(hotels);
});

module.exports = router;
