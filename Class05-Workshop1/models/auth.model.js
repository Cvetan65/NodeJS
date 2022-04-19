const path = require('path');
const DataService = require('../services/data.service');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

class AuthModel {
  static async loginUser(credentials) {
    const { email, password } = credentials;

    const users = await DataService.readJSONFile(usersPath);

    const validUser = users.find((user) => user.email === email && user.password === password);

    if (!validUser) {
        return Promise.reject({msg: 'Invalid Credentials'})
    }

    return validUser;

  }
}

module.exports = AuthModel;
