'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        line: {type: Number},
        name: String,
        description: String,
        wellbeing: String,
        level: String,
        verb: String
    },
    {
        collection: 'lines'
    });

module.exports = mongoose.model('Line', schema);