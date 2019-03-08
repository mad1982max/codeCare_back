const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./routes/note.route');
const users = require('./routes/user.route');

const ErrorsClass = require('./libs/handleErrors');
const errorJson = require('./services/errorResponse');

const port = 3000;
const mongoose = require('mongoose');
const db_userName = 'code-care1';
const db_psw = 'code-care1';
const db_url = `mongodb://${db_userName}:${db_psw}@ds161285.mlab.com:61285/code-care`

const app = express();

const dbOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    reconnectTries: 5
};
const db = mongoose.connection;

mongoose.connect(db_url, dbOptions)
//const db = mongoose.connection;
db.on('open', () => console.log('...connected to db', db_url));
db.on('error', (err) => console.log('--err', err))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res, next) => res.send({hello: true}));
app.use('/notes', notes);
app.use('/users', users);

// app.use(ErrorsClass.error404);
// app.use(ErrorsClass.handleError);


app.use((req, res, next) => {
    const err = {};
    err.code = 404;
    err.message = 'Page not found';
    errorJson(err, req, res, next);       
})

app.listen(port, () => console.log('...listening port', port));         





