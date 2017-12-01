'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: String,
        L: Number,
        F: Number,
        P: Number,
        M: Number,
        A: Number
    },
    {
        collection: 'bazi_gods_strength'
    });

module.exports = mongoose.model('BaZi Gods Strength', schema);