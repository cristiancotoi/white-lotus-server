'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
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