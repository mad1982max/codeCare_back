const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validator = require('../middleware/validation')

router.post('/', validator.userCreate(), validator.result, userController.createUser);
router.post('/login', validator.userLogin(), validator.result, userController.loginUser);

module.exports = router;