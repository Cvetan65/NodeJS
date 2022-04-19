const path = require('path');
const DataService = require('../services/data.service');
const { v4: uuid } = require('uuid');
const { realpathSync } = require('fs');
const DishModel = require('../models/dish.model');

const orderesPath = path.join(__dirname, '..', 'data', 'orders.json');

class OrderModel {
  static async getAllOrders() {
    return DataService.readJSONFile(orderesPath);
  }

  static async getOrderById(orderId) {
    const orders = await this.getAllOrders();

    const foundOrder = orders.find((order) => order.id === orderId);

    if (foundOrder) {
      return foundOrder;
    } else {
      return Promise.reject({ msg: 'No order found' });
    }
  }

  static async addNewOrder(newOrderData) {
    const orders = await this.getAllOrders();

    const dishes = await DishModel.getAllDishes();

    const dishExists = dishes.some((dish) => dish.name === newOrderData.name);

    if (!dishExists) {
      return Promise.reject({ msg: 'Dish does not exist' });
    }

    const newOrder = {
      id: uuid(),
      ...newOrderData
    };

    const updatedOrders = [...orders, newOrder];

    await DataService.saveJSONFile(orderesPath, updatedOrders);

    return newOrder;
  }

  static async patchOrder(orderId, orderUpdateData) {
    const orders = await this.getAllOrders();

    const foundOrder = await this.getOrderById(orderId);

    const updatedOrder = { ...foundOrder, ...orderUpdateData };

    const updatedOrders = orders.map(order => order.id === foundOrder.id ? updatedOrder : order
    );

    await DataService.saveJSONFile(orderesPath, updatedOrders)

  }

  static async patchStatus(orderId, statusUpdateData) {
    const orders = await this.getAllOrders();

    const foundOrder = await this.getOrderById(orderId);

    const updatedOrder = { ...foundOrder, ...orderUpdateData };

    const updatedOrders = orders.map(order => order.id === foundOrder.id ? updatedOrder : order
    );

    await DataService.saveJSONFile(orderesPath, updatedOrders)

    return updatedOrder;

  }

  static async removeOrder(orderId) {
    const orders = await this.getAllOrders();

    const updatedOrder = orders.filter(order => order.id !== orderId);

    if (updatedOrder.length === orders.lehhth) {
        return Promise.reject({msg: 'Neko među nama nije naš'})
    }

    await DataService.saveJSONFile(orderesPath, updatedOrder)
  }

}

module.exports = OrderModel;
