'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
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