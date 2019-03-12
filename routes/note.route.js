const express = require('express');
const router = express.Router();

const noteController = require('../controllers/note.controller');
const validator = require('../middleware/validation');

router.use(validator.varifyToken);

router.post('/', validator.noteBody(), validator.result, noteController.create);
router.get('/', noteController.getAll);
router.get('/days/:day', noteController.getOneDay);
router.put('/:id', noteController.updateOne);
router.delete('/:id', noteController.deleteOne);

module.exports = router;