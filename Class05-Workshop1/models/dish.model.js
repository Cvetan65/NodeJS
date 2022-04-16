const path = require('path');
const DataService = require('../services/data.service');
const {v4: uuid} = require('uuid');

const dishesPath = path.join(__dirname, '..', 'data', 'dish.json');

class DishModel {
    static async getAllDishes() {
        return DataService.readJSONFile(dishesPath);
    }
    
static async getDishByName(dishName){
    const dishes = await this.getAllDishes();

    const fondDishByName = dishes.find(dish => dish.name === dishName);

    if (foundDishByName) {
        return foundDishByName;
    } else {
        return Promise.reject({msg: 'No Dish Found'})
    }
}

    static async getDishById(dishId) {
        const dishes = await this.getAllDishes();

        const foundDish = dishes.find(dish => dish.id === dishId);

        if (foundDish) {
            return foundDish
        } else {
            return Promise.reject({msg: 'No dish found'})
        }
    }

    static async addNewDish(newDishData) {
        const dishes = await this.getAllDishes();

        const dishExists = dishes.some(dish => dish.name === newDishData.name); 

        if (dishExists) {
            return Promise.reject({msg: 'The dish alerady exists'})
        }

        const newDish = {
            id: uuid, 
            ...newDishData
        }

        const updatedDishes = [...dishes, newDish];

        await DataService.saveJSONFile(dishesPath, updatedDishes);

        return newDish;
    }

    static async patchDish(dishId, dishesUpdatedData) {
        const dishes = await this.getAllDishes();

        const foundDish = await this.getDishById(dishId);

        const updtedDish = {...foundDish, ...dishesUpdatedData};

        const updatedDishes = dishes.map(dish => dish.id === foundDish.id ? updatedDishes : dish);

        await DataService.saveJSONFile(dishesPath, updatedDishes);
    }

    static async deleteDish(dishId) {
        const dishes = await this.getAllDishes();

        const updatedDishes = dishes.filter(dish => dish.id !== dishId);

        if (updatedDishes.longth === dishes.length) {
            return Promise.reject({msg: 'Dish Not Found'})
        }

        await DataService.saveJSONFile(dishesPath, updatedDishes)
    }
}

module.exports = DishModel;