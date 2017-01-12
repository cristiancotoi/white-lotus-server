'use strict';

var moment = require('moment-timezone');
var _ = require('underscore');

var utils = function (date) {
    var _birthDay = moment(date);

    function getMoment() {
        return _birthDay;
    }

    function getAge(now, unit) {
        var u = _.isUndefined(unit) ? 'year' : unit;
        if (_.isUndefined(now)) {
            now = moment();
        }
        return now.diff(_birthDay, u, false);
    }

    function getCurrentLuckPillar(pillarStart, now) {
        if (_.isUndefined(now)) {
            now = moment();
        }
        var luckStart = moment(_birthDay).add(pillarStart, 'years');
        var yearsDiff = now.diff(luckStart, 'year', false);
        return Math.floor(yearsDiff / 10);
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
        getCurrentLuckPillar: getCurrentLuckPillar,
        include: getAgeString,
        getMoment: getMoment
    };
};

module.exports = utils;