const jwt = require('jsonwebtoken');
const CustomError = require('../libs/handleErrors');
require('dotenv').config();

module.exports = {
    sign: async(payload) => {
        try {
            const token = await jwt.sign(payload, process.env.SECRET, {expiresIn: process.env.EXP_TOKEN});
            const refreshToken = await jwt.sign(payload, process.env.SECRET, {expiresIn: process.env.EXP_REFRESH_TOKEN});
            return {token, refreshToken};
        } catch(err) {
            throw new CustomError({
                message: 'signing token error',
                code: 400
            });
        }
    },

    verify: async(token) => {
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            return decoded;
        } catch(err) {
            throw new CustomError({
                message: 'error verifying local token',
                code: 401
            });
        }
    }
}