const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class User {
  constructor(firstName, lastName, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }

  //Create user
  static async createUser(userData) {
    const users = await this.getAllUsers();

    const userExists = users.some((user) => user.email === userData.email);
    if (userExists) {
      return Promise.reject({ msg: "Invalid credentials" });
    }
    console.log(userData);

    //hashing password
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    console.log(hashedPassword);

    const newUser = new User(
      userData.firstName,
      userData.lastName,
      userData.email,
      hashedPassword
    );
    console.log("This is new user");
    console.log(newUser);

    //updating user
    const updatedUsers = [...users, newUser];
    //Saving
    await DataService.saveJSONFile(usersPath, updatedUsers);

    const { password, ...userWithoutPassword } = newUser;

    return newUser;
  }

  //login user
  static async loginUser(credentials) {
    const { email, password } = credentials;
    const users = await this.getAllUsers();
    //checking if user exists - through email
    const foundUser = users.find((user) => user.email === email);
    if (!foundUser) {
      return Promise.reject({ msg: "Invalid credentials" });
    }
    //checking if password is ok
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return Promise.reject({ msg: "Invalid Credentials" });
    }

    const { password: hashedPassword, ...userWithoutPassword } = foundUser;
  }
}

module.exports = AuthModel; 
