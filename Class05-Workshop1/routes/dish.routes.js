const router = require('express').Router();
const DishController = require('../controlles/dish.controller');

router.use('/all', DishController.fetchAllDishes);

router.use('/name', DishController.fetchDishByName)

router.use('/:id', DishController.fetchDishById);

router.use('/add', DishController.createNewDish);

router.use('/:id/update', DishController.updateDish);

router.use('/:id', DishController.deleteDish);




module.exports = router;