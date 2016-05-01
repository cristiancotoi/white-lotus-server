'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var opSchema = new Schema({
        number: {type: Number, min: 1, max: 10},
        description: String
    },
    {
        collection: 'op'
    });

module.exports = mongoose.model('OperationalNumber', opSchema);