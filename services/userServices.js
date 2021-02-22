const User = require('../models/User');

class UserServices {
  //get user with the field passed in
  async getUser(data) {
    return User.findOne(data).exec();
  }

  //create a new user object

  async addUser(data) {
    return new User(data);
  }
}

const userServices = new UserServices();
module.exports = userServices;
