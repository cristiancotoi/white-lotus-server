'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        level: {type: Number, min: 0, max: 5},
        min: {type: Number, min: 0, max: 100},
        max: {type: Number, min: 0, max: 100},
        description: String
    },
    {
        collection: 'spiritlevel'
    });

module.exports = mongoose.model('SpiritLevel', schema);