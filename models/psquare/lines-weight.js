'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        line: {type: Number},
        weight: Number,
        max: Number,
        description: String
    },
    {
        collection: 'lines_weight'
    });

module.exports = mongoose.model('LineWeight', schema);