/**
 * Created by Cristian on 04/04/2016.
 */

var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    date: {
        year: {type: Number, min: 1900, max: 9999},
        month: {type: Number, min: 0, max: 11},
        day: {type: Number, min: 1, max: 31},
        hour: {type: Number, min: 0, max: 23 },
        minutes: {type: Number, min: 0, max: 59 }
    },
    tz: {type: Number, default: 2},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Person', PersonSchema);