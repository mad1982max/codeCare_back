const errorJson = require('../services/errorResponse');

class ErrorsClass extends Error {
    constructor({message, code = 500, name}) {
        super(message);
        this.name = name || this.constructor.name;
        this.code = code
    }

    static error404 (req, res, next) {
        next(new ErrorsClass(404, 'Page not found', 'Page not found'))
    }
    
    static handleError(err, req, res, next) {
        errorJson(err, req, res);
    }
}

module.exports = ErrorsClass;