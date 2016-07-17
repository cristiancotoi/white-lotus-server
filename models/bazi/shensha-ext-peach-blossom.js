'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        id: String,
        externalpeachblossom: String
    },
    {
        collection: 'bazi_shensha_ext_peach_blossom'
    });

module.exports = mongoose.model('BaZi ShenSha External Peach Blossom', schema);