'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        level: {type: Number, min: 0, max: 5},
        min: {type: Number, min: 0, max: 100},
        max: {type: Number, min: 0, max: 100},
        description: String
    },
    {
        collection: 'spiritlevel'
    });

module.exports = mongoose.model('SpiritLevel', schema);