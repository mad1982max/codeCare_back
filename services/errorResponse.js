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

    
    // const isCastError = ~err.message.indexOf('Cast to ObjectId failed');
    // console.log(err.message);
    
    // const msg = isCastError? 'not found': err.message


    res.status(err.code);
    answerJson({
        res,
        msg: err.message,
        code: err.code,
        success: false,
    });
}