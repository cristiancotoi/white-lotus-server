'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        number: Number,
        lang: String,
        title: String,
        description: String,
        suggestion: String
    },
    {
        collection: 'ps_challenges'
    });

module.exports = mongoose.model('PS Challenges', schema);