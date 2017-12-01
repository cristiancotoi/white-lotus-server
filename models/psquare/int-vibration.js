'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        number: {type: Number, min: 0, max: 9},
        description: String,
        planet: String,
        qualities: String
    },
    {
        collection: 'int_vibration'
    });

module.exports = mongoose.model('InteriorVibration', schema);