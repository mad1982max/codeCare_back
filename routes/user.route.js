const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validator = require('../middleware/validation')

//router.get('/test', noteController.test);
// router.post('/', validator.noteBody(), validator.result, noteController.create);
// router.get('/', noteController.getAll);

// router.get('/user/:userId/day/:dayId', noteController.getByParams);

// router.get('/:id', noteController.getOne);
// router.put('/:id', noteController.updateOne);
// router.delete('/:id', noteController.deleteOne);


router.post('/', validator.userCreate(), validator.result, userController.createUser);
router.post('/login', validator.userLogin(), validator.result, userController.loginUser);



module.exports = router;