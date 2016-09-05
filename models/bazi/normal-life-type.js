'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        shortname: String,
        name: String,
        description: String
    },
    {
        collection: 'bazi_normal_life_type'
    });

module.exports = mongoose.model('BaZi Normal Life Type', schema);