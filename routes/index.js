const { Router } = require('express');
const AuthRouter = require('./Auth');

const router = Router();

router.use('/auth', AuthRouter);

router.get('/*', (req, res) => {
  return res.status(404).end();
});

module.exports = router;
