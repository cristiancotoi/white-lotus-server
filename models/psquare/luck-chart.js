'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        id: Number,
        description: String,
        first: String
    },
    {
        collection: 'luck_chart'
    });

module.exports = mongoose.model('Luck Chart', schema);