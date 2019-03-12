const answerJson = require('./response');

module.exports = (err, req, res, next) => {

    if(err.name === 'MongoError') {
        switch(err.code) {
            case 11000:    
            err.message = 'item is already exist';
            break;
        }
        err.code = 500;
    }
    
    if(err.name === 'CastError') {
        err.message = 'can\'t find item';
        err.code = 500;
    }

    answerJson({
        res,
        msg: err.message,
        code: err.code,
        success: false,
    });
}