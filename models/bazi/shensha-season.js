'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        id: String,
        heavennoblevirtue: String,
        heavenpeacevirtue: String,
        seasonnoblevirtue: String,
        seasonpeacevirtue: String,
        seasonbreaker: String,
        bloodedge: String
    },
    {
        collection: 'bazi_shensha_season'
    });

module.exports = mongoose.model('BaZi ShenSha Season', schema);