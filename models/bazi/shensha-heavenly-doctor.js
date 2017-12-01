'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: String,
        heavenlydoctor: String
    },
    {
        collection: 'bazi_shensha_heavenly_doctor'
    });

module.exports = mongoose.model('BaZi ShenSha Heavenly Doctor', schema);