/**
 * .
 */

var mongoose = require('mongoose');
var collExists = require('./collection-exists-checker');
var Schema = mongoose.Schema;
var collName = 'persons';

// Quick exit if collection exists
if (collExists(collName)) {
    console.log('Collection ' + collName + ' already exists!');
    return;
}

var personSchema = new Schema({
        name: String,
        surname: String,
        date: {
            year: {type: Number, min: 1900, max: 9999},
            month: {type: Number, min: 0, max: 11},
            day: {type: Number, min: 1, max: 31},
            hour: {type: Number, min: 0, max: 23},
            minutes: {type: Number, min: 0, max: 59}
        },
        tz: Number,
        longitude: Number,
        analystId: String,
        gender: String
    },
    {
        collection: collName
    });

module.exports = mongoose.model('Person', personSchema);