'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        number: Number,
        lang: String,
        title: String,
        description: String
    },
    {
        collection: 'ps_opportunities'
    });

module.exports = mongoose.model('PS Opportunities', schema);