'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        presc: String,
        aspect: String,
        "yin organ": String,
        "yang organ": String,
        season: String,
        "day phase": String,
        environment: String,
        color: String,
        "color code": String,
        taste: String,
        "human sound": String,
        smell: String,
        "negative emotion": String,
        "positive emotion": String,
        vitue: String,
        nourish: String,
        "body fluid": String,
        sense: String,
        "body area": String,
        finger: String,
        "energy type": String,
        "phase of development": String,
        life: String,
        phase: String,
        direction: String,
        planet: String,
        "mental clarity": String,
        geometry: String,
        intelectual: String,
        material: String,
        cereal: String,
        fruit: String,
        sound: String

    },
    {
        collection: 'bazi_phases'
    });

module.exports = mongoose.model('BaZiPhase', schema);