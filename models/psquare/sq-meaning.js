'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        number: {type: Number, min: 0, max: 9},
        min: {type: Number, min: 0, max: 9},
        max: {type: Number, min: 0, max: 99},
        description: String
    },
    {
        collection: 'sq_meanings'
    });

module.exports = mongoose.model('SquareMeanings', schema);