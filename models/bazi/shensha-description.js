'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
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