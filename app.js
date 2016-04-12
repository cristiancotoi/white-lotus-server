/**
 * Created by Sandeep on 01/06/14.
 */

// Load Our Modules

var express = require('express');
var bodyParser = require('body-parser');
var persons = require('./routes/persons');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

//connect to our database
//Ideally you will obtain DB details from a config file

var dbName='personDB';

var connectionString='mongodb://localhost:27017/'+dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api', persons);

module.exports = app;
