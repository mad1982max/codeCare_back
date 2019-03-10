const answerJson = require('../services/response');
const errorJson = require('../services/errorResponse');
const jwtService = require('../services/jwt.service');
const {body, validationResult} = require('express-validator/check');

module.exports = {
    varifyToken: async (req, res, next) => {
        try {
            console.log('here');
            
            const token = req.headers['x-access-token'];
            console.log(token);
            
            
            if (!token) {
                throw new Error('no verifying token');
            }

            const decoded = await jwtService.verify(token);
            
            // if(decoded._id !== req.params.userId) {
            //     throw new Error('error token validation');
            // }
            
            req.decodedToken = decoded;
            return next();

        } catch(err) {
            err.code = 401;
            errorJson(err, req, res);
        }
    },
    
    noteBody: () => {
        return [
            body('title').exists().not().isEmpty().isString().isLength({ max: 100 }),
            body('dayOfWeek').exists().not().isEmpty().isInt(),
            body('start').exists().not().isEmpty().isInt().isLength({min: 0}),
            body('duration').exists().not().isEmpty().isInt().isLength({min: 0}) 
        ]
    },

    userCreate: () => {
        return [
            body('firstName').exists().not().isEmpty().isString().isLength({min: 3, max: 10}),
            body('lastName').exists().not().isEmpty().isString().isLength({min: 3, max: 10}),
            body('email').exists().not().isEmpty().isEmail(),
            body('password').exists().not().isEmpty().isString().isLength({min: 3, max: 10}),
        ]
    },

    userLogin: () => {
        return [
            body('email').exists().not().isEmpty().isEmail(),
            body('password').exists().not().isEmpty().isString().isLength({min: 3, max: 10}),
        ]
    },

    result: (req, res, next) => {
        validationResult(req).isEmpty()
            ? next()
            : answerJson(
                {
                    res,
                    success: false,
                    code: 401,
                    msg: 'invalid credentials'
                })
    }
}