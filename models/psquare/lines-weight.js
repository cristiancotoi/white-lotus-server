'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        line: {type: Number},
        weight: Number,
        max: Number,
        description: String
    },
    {
        collection: 'lines_weight'
    });

module.exports = mongoose.model('LineWeight', schema);