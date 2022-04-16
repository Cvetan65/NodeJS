const router = require('express').Router();
const dishesRouter = require('../routes/dish.routes');

router.use('/dishes', dishesRouter);

module.exports = router;