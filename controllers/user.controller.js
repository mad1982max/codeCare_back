const answerJson = require('../services/response');
const errorJson = require('../services/errorResponse');
const userService = require('../services/user.service');
const jwtService = require('../services/jwt.service');

module.exports = {
    createUser: async(req, res, next) => {
        try {
            const data = Object.assign({}, req.body);
            const user = await userService.createUser(data);
            
            return answerJson({
                res,
                data: user,
                msg: 'user is created'
            });

        } catch(err) {
            errorJson(err, req, res);
        }
    },

    loginUser: async(req, res, next) => {
        try {
            let {email, password} = req.body;
            let user = await userService.getByEmail(email);
            await user.checkHash(password);

            const {token, refreshToken} = await jwtService.sign({email: user.email, _id: user.id});
            console.log(token);

            answerJson({
                res,
                data: {token, refreshToken},
                message: 'user logged in'
            });

        } catch(err) {
            errorJson(err, req, res);
        }
    }
}