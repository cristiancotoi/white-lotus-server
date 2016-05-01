'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var opSchema = new Schema({
        number: {type: Number, min: 0, max: 100},
        description: String
    },
    {
        collection: 'general'
    });

module.exports = mongoose.model('GeneralNumbers', opSchema);