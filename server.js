require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./routes/note.route');
const users = require('./routes/user.route');
const cors = require('cors');

const errorJson = require('./services/errorResponse');

const mongoose = require('mongoose');

const app = express();

const dbOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    reconnectTries: 5
};
const db = mongoose.connection;

mongoose.connect(process.env.DB_URL, dbOptions)
db.on('open', () => console.log('...connected to db'));
db.on('error', (err) => console.log('--err', err))

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/notes', notes);
app.use('/users', users);

app.use((req, res, next) => {
    const err = {};
    err.code = 404;
    err.message = 'Page not found';
    errorJson(err, req, res, next);       
});

app.listen(process.env.DB_PORT, () => console.log('...listening port', process.env.DB_PORT));         





