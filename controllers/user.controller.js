//const userService = require('../services/user.servise');
const answerJson = require('../services/response');
const errorJson = require('../services/errorResponse');
const userService = require('../services/user.service');
const jwtService = require('../services/jwt.service');

//exports.test = (req, res, next) => res.send({test: 'ok'});

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

            answerJson({
                res,
                data: {token, refreshToken},
                message: 'user logged in'
            });

        } catch(err) {
            errorJson(err, req, res);
        }
    }

        
        
        // try {
        //     console.log('*****in controller');
            
        //     const data = Object.assign({}, req.body);
        //     //console.log(data);
            
        //     const user = await userService.createUser(data);
            
        //     return answerJson({
        //         res,
        //         data: user,
        //         msg: 'user is created'
        //     });
        // } catch(err) {
        //     console.log('++++in err contr', err);
            
        //     errorJson(err, req, res);
        // }
    // },

//     getByParams: async(req, res, next) => {
//         try {
//             const userId = req.params.userId;
//             const dayId = req.params.dayId;
//             const notes = await noteService.getAllByParams(userId, dayId);
//             return answerJson({
//                 res,
//                 data: notes,
//                 msg: 'get all notes'
//             });
//         } catch(err) {
//             err.code = 500;
//             errorJson(err, req, res);
//         }
//     },





//     getAll: async(req, res, next) => {
//         try {
//             const notes = await noteService.getAll();
//             return answerJson({
//                 res,
//                 data: notes,
//                 msg: 'get all notes'
//             });
//         } catch(err) {
//             err.code = 500;
//             errorJson(err, req, res);
//         }
//     },







//     getOne: async(req, res, next) => {
//         try {
//             let id = req.params.id;
//             const note = await noteService.getOne(id);
//             return answerJson({
//                 res,
//                 data: note,
//                 msg: 'get one note'
//             });
//         } catch(err) {
//             //err.code = 500;
//             errorJson(err, req, res);
//         }
//     },
//     updateOne: async(req, res, next) => {
//         try {
//             let id = req.params.id;
//             let updObj = req.body;
//             const note = await noteService.updateOne(id, updObj);
//             return answerJson({
//                 res,
//                 data: note,
//                 msg: 'update one note'
//             });
//         } catch(err) {
//             err.code = 500;
//             errorJson(err, req, res);
//         }
//     },
//     deleteOne: async(req, res, next) => {
//         try {
//             let id = req.params.id;
//             const note = await noteService.deleteOne(id);
//             return answerJson({
//                 res,
//                 data: note,
//                 msg: 'delete one note'
//             });
//         } catch(err) {
//             err.code = 500;
//             errorJson(err, req, res);
//         }
//     }
}