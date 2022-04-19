const router = require('express').Router();
const dishesRouter = require('../routes/dish.routes');
const ordersRouter = require('../routes/order.routes');
const authRouter = require('../routes/auth.routes');

router.use('/dishes', dishesRouter);
router.use('/orders', ordersRouter);
router.use('/auth', authRouter)

module.exports = router;