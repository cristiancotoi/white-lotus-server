/**
 * .
 */

// Load Our Modules

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var persons = require('./routes/persons');
var pSquare = require('./routes/psquare');

var app = express();

//connect to our database
//Ideally you will obtain DB details from a config file

var dbName='whitelotus';

var connectionString='mongodb://localhost:27017/'+dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api', persons);
app.use('/api', pSquare);

module.exports = app;
