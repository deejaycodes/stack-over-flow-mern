const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      console.log('no token');
      return res.status(401).send({
        code: 401,
        error: true,
        msg: 'Please provide an authorization token',
      });
    }

    token = token.replace('Bearer ', '');
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded._id;
    const user = await User.findOne({_id: id, 'tokens.token': token});
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      code: 401,
      error: true,
      msg: 'Please authenticate',
    });
  }
};

module.exports = auth;
