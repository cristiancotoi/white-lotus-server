'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        hs: [String],
        category: String,
        categoryDescription: String,

        result: String
    },
    {
        collection: 'bazi_heavenly_stem_relations'
    });

module.exports = mongoose.model('BaZi Stem Relation', schema);