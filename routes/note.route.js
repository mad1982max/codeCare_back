const express = require('express');
const router = express.Router();

const noteController = require('../controllers/note.controller');
const validator = require('../middleware/validation')

//router.get('/test', noteController.test);
router.post('/', validator.noteBody(), validator.result, noteController.create);
router.get('/', noteController.getAll);

router.get('/user/:userId/day/:dayId', noteController.getByParams);

router.get('/:id', noteController.getOne);
router.put('/:id', noteController.updateOne);
router.delete('/:id', noteController.deleteOne);





module.exports = router;