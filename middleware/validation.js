const answerJson = require('../services/response');
const errorJson = require('../services/errorResponse');
const { body, validationResult, query } = require('express-validator/check');

module.exports = {
    noteBody: () => {
        return [
            body('userId').exists().not().isEmpty().isString(),
            body('title').exists().not().isEmpty().isString().isLength({ max: 100 }),
            body('day').exists().not().isEmpty().isInt(),
            body('start').exists().not().isEmpty().isInt().isLength({min: 0}),
            body('duration').exists().not().isEmpty().isInt().isLength({min: 0}) 
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