'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        ord: String,
        hs: String,
        eb: String,
        hseb: String,
        pinyin: String,
        phase: String,
        associations: String,
        ad: Number,
        bc: Number,
        year: Number
    },
    {
        collection: 'bazi_binomial'
    });

module.exports = mongoose.model('BaZiBinomial', schema);