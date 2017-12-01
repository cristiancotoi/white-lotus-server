'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: Number,
        description: String,
        first: String
    },
    {
        collection: 'luck_chart'
    });

module.exports = mongoose.model('Luck Chart', schema);