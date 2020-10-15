const { Router } = require('express');
const authRouter = require('./auth');
const hotelRouter = require('./hotels');

const router = Router();

router.use('/auth', authRouter);
router.use('/hotels', hotelRouter);

router.get('/*', (req, res) => {
  return res.status(404).end();
});

module.exports = router;
