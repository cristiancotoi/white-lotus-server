'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        line: {type: Number},
        type: String,
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