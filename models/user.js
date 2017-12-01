'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
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