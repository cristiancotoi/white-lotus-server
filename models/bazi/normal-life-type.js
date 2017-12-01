'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        shortname: String,
        name: String,
        description: String
    },
    {
        collection: 'bazi_normal_life_type'
    });

module.exports = mongoose.model('BaZi Normal Life Type', schema);