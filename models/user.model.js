const mongoose = require('mongoose');
const passwordService = require('../services/psw.service');

const Schema = mongoose.Schema;

let ModelSchema = new Schema({
    
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String,
        validate: {
            validator: function(value) {
            return /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
            },
            message: props => `${props.value} is not a valid email number!`
        },
        unique: true,
        required: true,
    },
    password: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

ModelSchema.statics.createHash = passwordService.createHash;
ModelSchema.methods.checkHash = passwordService.verifyPassword;

module.exports = mongoose.model('User', ModelSchema);