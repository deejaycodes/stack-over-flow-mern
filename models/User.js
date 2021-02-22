const mongoose = require('mongoose');
const userMethods = require('./userMethods');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('not a valid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userMethods(userSchema);

const User = mongoose.model('User', userSchema);
module.exports = User;
