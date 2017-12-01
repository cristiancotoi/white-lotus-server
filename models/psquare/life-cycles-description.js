'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        number: {type: Number, min: 0, max: 9},
        description: String
    },
    {
        collection: 'life_cycles_desc'
    });

module.exports = mongoose.model('Life cycle description', schema);