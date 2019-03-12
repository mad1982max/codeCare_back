const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    start: {type: Number, required: true},
    duration: {type: Number, required: true},
    title: {type: String, required: true, max: 100},
    userId: {type: String, required: true},
    dayOfWeek: {type: Number, require: true},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);