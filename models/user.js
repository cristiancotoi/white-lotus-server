'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        analystId: String,
        role: String,
        level: {type: Number, min: 1, max: 12}
    },
    {
        collection: 'users'
    });

module.exports = mongoose.model('User', schema);