const noteService = require('../services/note.servise');
const answerJson = require('../services/response');
const errorJson = require('../services/errorResponse');

module.exports = {
    create: async(req, res, next) => {
        try {
            const data = Object.assign({}, req.body);
            data.userId = req.decodedToken._id;

            const note = await noteService.createNote(data);
            return answerJson({
                res,
                data: note,
                msg: 'note is created'
            });
        } catch(err) {
            errorJson(err, req, res);
        }
    },

    getOneDay: async(req, res, next) => {
        try {
            const userId = req.decodedToken._id;
            const day = req.params.day;

            const notes = await noteService.getOneDay(userId, day);
            return answerJson({
                res,
                data: notes,
                msg: 'get all day\'s notes'
            });
        } catch(err) {
            err.code = 500;
            errorJson(err, req, res);
        }
    },

    getAll: async(req, res, next) => {
        try {

            const userId = req.decodedToken._id;
            const notes = await noteService.getAll(userId);
            return answerJson({
                res,
                data: notes,
                msg: 'get all notes'
            });
        } catch(err) {
            err.code = 500;
            errorJson(err, req, res);
        }
    },
  
    updateOne: async(req, res, next) => {
        try {
            let noteId = req.params.id;
            let updateObj = req.body;
            let userId = req.decodedToken._id;
            const note = await noteService.updateOne(noteId, userId, updateObj);
            return answerJson({
                res,
                data: note,
                msg: 'update one note'
            });
        } catch(err) {
            err.code = 500;
            errorJson(err, req, res);
        }
    },

    deleteOne: async(req, res, next) => {
        try {
            let noteId = req.params.id;
            let userId = req.decodedToken._id;
            const note = await noteService.deleteOne(noteId, userId);
            return answerJson({
                res,
                data: note,
                msg: 'delete one note'
            });
        } catch(err) {
            err.code = 500;
            errorJson(err, req, res);
        }
    }
}