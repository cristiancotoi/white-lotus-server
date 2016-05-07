'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        number: {type: Number, min: 1, max: 10},
        description: String
    },
    {
        collection: 'destiny'
    });

module.exports = mongoose.model('Destiny', schema);