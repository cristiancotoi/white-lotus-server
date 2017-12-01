'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        number: Number,
        min1: Number,
        max1: Number,
        min2: Number,
        max2: Number,
        min3: Number,
        max3: Number
    },
    {
        collection: 'life_cycles'
    });

module.exports = mongoose.model('Life Cycle', schema);