'use strict';

let moment = require('moment-timezone');
let _ = require('lodash');

let utils = function (date) {
    let _birthDay = moment(date);

    function getMoment() {
        return _birthDay;
    }

    function getAge(now, unit) {
        let u = _.isUndefined(unit) ? 'year' : unit;
        if (_.isUndefined(now)) {
            now = moment();
        }
        return now.diff(_birthDay, u, false);
    }

    function getCurrentLuckPillar(pillarStart, now) {
        if (_.isUndefined(now)) {
            now = moment();
        }
        let luckStart = moment(_birthDay).add(pillarStart, 'years');
        let yearsDiff = now.diff(luckStart, 'year', false);
        return Math.floor(yearsDiff / 10);
    }

    function getAgeString(now) {
        let year = getAge(now, 'year');
        let months = getAge(now, 'month') % 12;
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