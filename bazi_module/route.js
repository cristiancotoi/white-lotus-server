'use strict';

let _ = require('lodash');
let moment = require('moment-timezone');

let Person = require('../models/person');
let BaZiMain = require('./main');
let CommonUtils = require('../common_module/utils');

function getIdRoute(req, res) {
    Person.findOne({_id: req.params.id}, function (err, person) {
        if (err) {
            res.send(err);
        } else {
            CommonUtils()
                .getUser(person.analystId)
                .then(function (user) {
                    let userLevel = _.isUndefined(user) ? 1 : user.level;
                    BaZiMain(person).make({level: userLevel}, res);
                }, function (err) {
                    res.send(err);
                });
        }
    });
}

/**
 * Return a simple chart
 */
function getChart(req, res) {
    let body = req.body;
    let mom = moment(body.date);
    let person = {
        date: {
            year: mom.year(),
            month: mom.month(),
            day: mom.date(),
            hour: mom.hour(),
            minutes: mom.minutes()
        },
        tz: mom.utcOffset() / 60,
        dst_active_at_birth: body.dst,
        longitude: body.longitude,
        gender: body.gender
    };
    BaZiMain(person).make({
        'core elements': false
    }, res);
}

module.exports = {
    "getId": getIdRoute,
    "getChart": getChart
};
