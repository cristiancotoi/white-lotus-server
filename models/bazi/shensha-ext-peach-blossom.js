'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: String,
        externalpeachblossom: String
    },
    {
        collection: 'bazi_shensha_ext_peach_blossom'
    });

module.exports = mongoose.model('BaZi ShenSha External Peach Blossom', schema);