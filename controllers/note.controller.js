const noteService = require('../services/note.servise');
const answerJson = require('../services/response');
const errorJson = require('../services/errorResponse');

//exports.test = (req, res, next) => res.send({test: 'ok'});

module.exports = {
    create: async(req, res, next) => {
        try {
            const data = Object.assign({}, req.body);
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

    getByParams: async(req, res, next) => {
        try {
            const userId = req.params.userId;
            const dayId = req.params.dayId;
            const notes = await noteService.getAllByParams(userId, dayId);
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





    getAll: async(req, res, next) => {
        try {
            const notes = await noteService.getAll();
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







    getOne: async(req, res, next) => {
        try {
            let id = req.params.id;
            const note = await noteService.getOne(id);
            return answerJson({
                res,
                data: note,
                msg: 'get one note'
            });
        } catch(err) {
            //err.code = 500;
            errorJson(err, req, res);
        }
    },
    updateOne: async(req, res, next) => {
        try {
            let id = req.params.id;
            let updObj = req.body;
            const note = await noteService.updateOne(id, updObj);
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
            let id = req.params.id;
            const note = await noteService.deleteOne(id);
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