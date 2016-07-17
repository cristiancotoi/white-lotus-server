'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        id: String,
        heavenlydoctor: String
    },
    {
        collection: 'bazi_shensha_heavenly_doctor'
    });

module.exports = mongoose.model('BaZi ShenSha Heavenly Doctor', schema);