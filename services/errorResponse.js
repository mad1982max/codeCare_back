const answerJson = require('./response');

module.exports = (err, req, res, next) => {

    
    // const isCastError = ~err.message.indexOf('Cast to ObjectId failed');
    // console.log(err.message);
    
    // const msg = isCastError? 'not found': err.message

    res.status(err.code);
    answerJson({
        res,
        msg: err.message,
        code: err.code,
        success: false,
    })
}