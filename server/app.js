const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));



module.exports = app;