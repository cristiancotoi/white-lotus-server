'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        analystId: String,
        roles: [String],
        level: {type: Number, min: 1, max: 99},
        creationDate: {type: Date, default: Date.now}
    },
    {
        collection: 'users'
    });

try {
    module.exports = mongoose.model('User', schema);
} catch (e) {
}