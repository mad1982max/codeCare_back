const NoteModel = require('../models/note.model');
const ErrorsClass = require('../libs/handleErrors');

module.exports = {
    createNote: async(data) => {
        try {
            let fields = {
                start: data.start,
                duration: data.duration,
                title: data.title,
                userId: data.userId,
                dayOfWeek: data.dayOfWeek
            };
            const note = await NoteModel.create(fields);
            return note;

        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
            })
        }
    },

    getAll: async(userId) => {
        try {
            let notes = await NoteModel.find({userId: userId});
            return notes;
        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
            })
        }
    },

    getOneDay: async(userId, day) => {
        try {
            let notes = await NoteModel.find({dayOfWeek: day, userId: userId});
            if(!notes) {
                throw new ErrorsClass({
                    message: 'note not found',
                    code: 404,
                })
            }
            return notes;
        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
            })
        }
    },

    updateOne: async(noteId, userId, updateObj) => {
        try {
            let note = await NoteModel.findOneAndUpdate({_id: noteId, userId: userId}, {$set: updateObj}, {new: true});
            return note;
        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
                name: err.name
            })
        }
    },


    deleteOne: async(noteId, userId) => {
        try {
            let note = await NoteModel.findOneAndDelete({_id: noteId, userId: userId});
            return note;
        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
                name: err.name
            })
        }
    }
}