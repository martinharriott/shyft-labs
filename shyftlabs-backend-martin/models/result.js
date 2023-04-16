const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    course: {
        type: String,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;