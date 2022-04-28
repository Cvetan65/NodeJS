const AuthModel = require("../models/auth.model");

class AuthController {
  //Register user
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      const registeredUsers = await AuthModel.createUser(userData);
      res.status(200).send(registeredUsers);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  //login user
  static async loginUser(req, res) {
    try {
      const credentials = req.body;
      const user = await AuthModel.loginUser(credentials);
      res.status(200).send(user)
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  }
 
}

module.exports = AuthController;
