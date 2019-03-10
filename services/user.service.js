const UserModel = require('../models/user.model');
const errorJson = require('./errorResponse');
const ErrorsClass = require('../libs/handleErrors');

module.exports = {
    createUser: async(data) => {
        try {
            let fields = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };
            const hashPsw = await UserModel.createHash(data.password);

            fields.password = hashPsw;
            const user = await UserModel.create(fields);
            return user;

        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
                name: err.name
            })
        }
    },

    getByEmail: async(email) => {
        try {
            let user = await UserModel.findOne({email: email});
            if(!user) {
                throw new ErrorsClass({
                    message: 'user not found',
                    code: 404,
                })
            }
            return user;

        } catch(err) {
            throw new ErrorsClass({
                message: err.message,
                code: err.code,
            })
        }
    },





//     getAll: async() => {
//         try {
//             let notes = await NoteModel.find();
//             return notes;
//         } catch(err) {
//             throw new ErrorsClass({
//                 message: err.message,
//                 code: err.code,
//             })
//         }
//     },

//     getAllByParams: async(userId, dayId) => {
//         try {
//             let notes = await NoteModel.find({dayOfWeek: dayId, userId: userId});
//             if(!notes) {
//                 throw new ErrorsClass({
//                     message: 'note not found',
//                     code: 404,
//                 })
//             }
//             return notes;
//         } catch(err) {
//             throw new ErrorsClass({
//                 message: err.message,
//                 code: err.code,
//             })
//         }
//     },












//     getOne: async(id) => {
//         try {
//             let note = await NoteModel.findById(id);
//             if(!note) {
//                 throw new ErrorsClass({
//                     message: 'note not found',
//                     code: 404,
//                 })
//             }
//             return note;
//         } catch(err) {
//             throw new ErrorsClass({
//                 message: err.message,
//                 code: err.code,
//             })
//         }
//     },

//     updateOne: async(id, updObj) => {
//         try {
//             let note = await NoteModel.findByIdAndUpdate(id, {$set: updObj}, {new: true});
//             return note;
//         } catch(err) {
//             console.log('err serv', err);
//         }
//     },
//     deleteOne: async(id) => {
//         try {
//             let note = await NoteModel.findByIdAndDelete(id);
//             return note;
//         } catch(err) {
//             console.log('err serv', err);
//         }
//     }

}