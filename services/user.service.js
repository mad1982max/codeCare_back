const UserModel = require('../models/user.model');
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
}