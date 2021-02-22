const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

//load single user to page when the app runs
router.get('/single', (req, res) => {
  usersController.getSingleUser(req, res);
});

//fetch single user's profile
router.get('/:id', (req, res) => {
  usersController.getUserProfile(req, res);
});

//log user out
router.post('/logout', (req, res) => {
  usersController.logOut(req, res);
});

router.get('/', (req, res) => {
  usersController.fetchUsers(req, res);
});

module.exports = router;
