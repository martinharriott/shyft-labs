const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbURI = 'mongodb://localhost:27017/shyft-labs';

const port = 8080;

const students = require('./controllers/students');
const courses = require('./controllers/courses');
const results = require('./controllers/results');

app.use(cors());
app.use(bodyParser.json());
app.use('/student', students);
app.use('/course', courses);
app.use('/result', results);


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    app.listen(port);
    console.log('connected to db');
}
).catch((err) => console.log(err));