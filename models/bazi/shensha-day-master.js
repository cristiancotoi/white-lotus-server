'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        id: String,
        heavenlynoble1: String,
        heavenlynoble2: String,
        academic: String,
        school: String,
        goldencarriage: String,
        prosperity: String,
        bath: String,
        redclouds: String,
        sword: String,
        flyingdagger: String,
        redenvy: String
    },
    {
        collection: 'bazi_shensha_day_master'
    });

module.exports = mongoose.model('BaZi ShenSha Day Master', schema);