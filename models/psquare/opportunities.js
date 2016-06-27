'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        number: Number,
        lang: String,
        title: String,
        description: String
    },
    {
        collection: 'ps_opportunities'
    });

module.exports = mongoose.model('PS Opportunities', schema);