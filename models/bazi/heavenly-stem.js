'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        presc: String,
        ord: Number,
        name: String,
        pinyin: String,
        phasepol: String,
        phase: String,
        pol: String,
        yinyang: String,
        "long phase": String,
        direction: String,
        "color code": String

    },
    {
        collection: 'bazi_heavenly_stem'
    });

module.exports = mongoose.model('BaZiHS', schema);