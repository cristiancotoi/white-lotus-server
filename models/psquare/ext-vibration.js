'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        number: {type: Number, min: 0, max: 9},
        description: String
    },
    {
        collection: 'ext_vibration'
    });

module.exports = mongoose.model('ExteriorVibration', schema);