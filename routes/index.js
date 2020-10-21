const { Router } = require('express');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const hotelRouter = require('./hotels');

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/hotels', hotelRouter);

router.get('/*', (req, res) => {
  return res.status(404).end();
});

module.exports = router;
