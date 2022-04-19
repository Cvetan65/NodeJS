const router = require('express').Router();
const OrderController = require('../controllers/order.controller');
const roleValidator = require('../middleware/role-validator.middleware');
const sessinoValidator = require('../middleware/session-validator.middleware');

router.use(roleValidator);

router.get('/all', OrderController.fetchAllOrders);

router.get('/:id', OrderController.fetchOrderById);

router.post('/add', sessinoValidator, OrderController.createNewOrder);

router.patch('/:id/update', OrderController.updateOrder);

router.patch('/:id/update-status', OrderController.updateStatus)

router.delete('/:id', OrderController.deleteOrder)

module.exports = router;
