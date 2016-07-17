'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        id: String,
        goldsafe: String,
        redphoenix: String,
        heavenlyjoy: String,
        robberytragic: String,
        peachblossom: String,
        dragonvirtue: String,
        fortunevirtue: String,
        funeralgate: String,
        disastertragic: String,
        hookedge: String,
        fiveghost: String,
        shatter: String,
        majorsquander: String,
        whitetiger: String,
        heavendog: String,
        adversity: String,
        dejavu: String,
        general: String,
        imperialcanopy: String,
        travellinghorse: String,
        separateedge: String,
        deceasedgod: String,
        daybreaker: String,
        solitary: String,
        widowlodge: String
    },
    {
        collection: 'bazi_shensha_day_branch'
    });

module.exports = mongoose.model('BaZi ShenSha Day Branch', schema);