'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        presc: String,
        "matching stem": String,
        ord: String,
        name: Number,
        pinyin: String,
        "zodiac name": String,
        direction: String,
        season: String,
        month: String,
        hours: String,
        h1: String,
        h2: String,
        h3: String,
        "color code": String

    },
    {
        collection: 'bazi_earthly_branch'
    });

module.exports = mongoose.model('BaZiEB', schema);