const NoteModel = require('../models/note.model');
const errorJson = require('./errorResponse');
const ErrorsClass = require('../libs/handleErrors');

module.exports = {
    createNote: async(data) => {
        try {
            let fields = {
                start: data.start,
                duration: data.duration,
                title: data.title,
                userId: data.userId,
                dayOfWeek: data.day
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




    getAll: async() => {
        try {
            let notes = await NoteModel.find();
            return notes;
        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
            })
        }
    },

    getAllByParams: async(userId, dayId) => {
        try {
            let notes = await NoteModel.find({dayOfWeek: dayId, userId: userId});
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












    getOne: async(id) => {
        try {
            let note = await NoteModel.findById(id);
            if(!note) {
                throw new ErrorsClass({
                    message: 'note not found',
                    code: 404,
                })
            }
            return note;
        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
            })
        }
    },

    updateOne: async(id, updObj) => {
        try {
            let note = await NoteModel.findByIdAndUpdate(id, {$set: updObj}, {new: true});
            return note;
        } catch(err) {
            console.log('err serv', err);
        }
    },
    deleteOne: async(id) => {
        try {
            let note = await NoteModel.findByIdAndDelete(id);
            return note;
        } catch(err) {
            console.log('err serv', err);
        }
    }

}