'use strict';
const jwt = require('jsonwebtoken');
const encryptionManager = require('../libs/encryption');

function schemaMethods(Schema) {
  Schema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
      const hash = encryptionManager.getHashed(user.password);
      user.password = hash;
    }
    next();
  });
  Schema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
  };

  Schema.methods.toJSON = function () {
    const user = this;
    const newUser = user.toObject();
    delete newUser.tokens;
    delete newUser.password;
    return newUser;
  };
}

module.exports = schemaMethods;
