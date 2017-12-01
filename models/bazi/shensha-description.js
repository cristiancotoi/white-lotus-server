'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: String,
        lang: String,
        name: String,
        chinese: String,
        direction: String
    },
    {
        collection: 'bazi_shensha_desc'
    });

module.exports = mongoose.model('BaZi ShenSha Descriptions', schema);