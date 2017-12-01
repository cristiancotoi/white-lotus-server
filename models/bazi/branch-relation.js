'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        eb1: String,
        eb2: String,
        eb3: String,

        category: String,
        categoryDescription: String,
        categorySolution: String,

        subcategory: String,
        subcategoryDescription: String,
        subcategorySolution: String,

        result: String
    },
    {
        collection: 'bazi_branch_relations'
    });

module.exports = mongoose.model('BaZi Branch Relation', schema);