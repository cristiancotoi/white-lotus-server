'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        min1: {type: Number, min: 0, max: 9},
        max1: {type: Number, min: 0, max: 99},
        min2: {type: Number, min: 0, max: 9},
        max2: {type: Number, min: 0, max: 99},
        min3: {type: Number, min: 0, max: 9},
        max3: {type: Number, min: 0, max: 99},
        min4: {type: Number, min: 0, max: 9},
        max4: {type: Number, min: 0, max: 99},
        min5: {type: Number, min: 0, max: 9},
        max5: {type: Number, min: 0, max: 99},
        min6: {type: Number, min: 0, max: 9},
        max6: {type: Number, min: 0, max: 99},
        min7: {type: Number, min: 0, max: 9},
        max7: {type: Number, min: 0, max: 99},
        min8: {type: Number, min: 0, max: 9},
        max8: {type: Number, min: 0, max: 99},
        min9: {type: Number, min: 0, max: 9},
        max9: {type: Number, min: 0, max: 99},
        description: String
    },
    {
        collection: 'sq_combo'
    });

module.exports = mongoose.model('SquareCombo', schema);