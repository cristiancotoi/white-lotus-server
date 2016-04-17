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

// default to a 'localhost' configuration:
var connectionString = '127.0.0.1:27017/' + dbName;

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api', persons);
app.use('/api', pSquare);

module.exports = app;
