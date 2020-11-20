const { Router } = require('express');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const hotelRouter = require('./hotels');
const hotelOffersRouter = require('./hotel-offers');
const cityRouter = require('./cities');

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/hotels', hotelRouter);
router.use('/hotel-offers', hotelOffersRouter);
router.use('/cities', cityRouter);

router.get('/*', (req, res) => {
  return res.status(404).end();
});

module.exports = router;
