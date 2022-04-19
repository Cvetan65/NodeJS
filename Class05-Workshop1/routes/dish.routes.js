const router = require('express').Router();
const DishController = require('../controllers/dish.controller');
const sessinoValidator = require('../middleware/session-validator.middleware');
const roleValidator = require('../middleware/role-validator.middleware');

router.use(roleValidator);

router.get('/all', sessinoValidator, DishController.fetchAllDishes);

router.get('/name', sessinoValidator, DishController.fetchDishByName)

router.get('/:id', sessinoValidator, DishController.fetchDishById);

router.post('/add', DishController.createNewDish);

router.post('/:id/update', DishController.updateDish);

router.delete('/:id', DishController.deleteDish);




module.exports = router;