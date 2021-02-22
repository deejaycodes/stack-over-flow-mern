const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

//signup user
router.post('/signup', (req, res) => {
  authController.signUp(req, res);
});

router.post('/login', (req, res) => {
  authController.logIn(req, res);
});

module.exports = router;
