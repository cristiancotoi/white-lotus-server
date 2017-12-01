'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: String,
        month: String,
        year: String,
        type: String
    },
    {
        collection: 'bazi_shensha_3_marvels'
    });

module.exports = mongoose.model('BaZi ShenSha 3 Marvels', schema);