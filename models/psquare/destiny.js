'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
        number: {type: Number, min: 1, max: 10},
        description: String
    },
    {
        collection: 'destiny'
    });

module.exports = mongoose.model('Destiny', schema);