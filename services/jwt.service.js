const jwt = require('jsonwebtoken');
const CustomError = require('../libs/handleErrors');

let secret = 'my secret';
let exp_token = '1d';
let exp_refreshToken = '1w';


module.exports = {
    sign: async(payload) => {
        try {
            const token = await jwt.sign(payload, secret, {expiresIn: exp_token});
            const refreshToken = await jwt.sign(payload, secret, {expiresIn: exp_refreshToken});
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

            const decoded = await jwt.verify(token, secret);
            return decoded;
        } catch(err) {
            throw new CustomError({
                message: 'error verifying local token',
                code: 401
            });
        }
    }
}