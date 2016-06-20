'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        id: String,
        element: String,
        description: String,
        physique: String,
        positive: String,
        negative: String,
        path_to_happiness: String,
        happiness: String
    },
    {
        collection: 'bazi_daymaster'
    });

module.exports = mongoose.model('BaZiDM', schema);