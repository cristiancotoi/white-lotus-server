'use strict';

var moment = require('moment');
var _ = require("underscore");

var utils = function (date) {
    var _b = moment(date);

    function getMoment() {
        return _b;
    }

    function getAge(now, unit) {
        var u = _.isUndefined(unit) ? 'year' : unit;
        if (_.isUndefined(now)) {
            now = moment();
        }
        return now.diff(_b, u, false);
    }

    function getAgeString(now) {
        var year = getAge(now, 'year');
        var months = getAge(now, 'month') % 12;
        return {
            year: year,
            months: months
        }
    }

    return {
        getAge: getAge,
        getAgeString: getAgeString,
        getMoment: getMoment
    };
};

module.exports = utils;