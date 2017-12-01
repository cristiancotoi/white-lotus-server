'use strict';

let _ = require("lodash");
let moment = require("moment-timezone");

let CommonUtils = require('../../common_module/utils');

let astro = function () {
    function normalizeAngle(angle) {
        // reduce the angle
        angle = angle % 360;

        // force it to be the positive remainder, so that 0 <= angle < 360
        angle = (angle + 360) % 360;
        return angle;
    }

    function subtractHour(dateObj, hours, minutes) {
        let result = CommonUtils().getMoment(dateObj);
        result.subtract(hours, 'hour');
        result.subtract(minutes, 'minute');
        dateObj.year = result.year();
        dateObj.month = result.month() + 1;
        dateObj.day = result.date();
        dateObj.hour = result.hour();
        dateObj.hour_int = result.hour();
        dateObj.minute = result.minute();
        return dateObj;
    }

    function getAstroData(person) {
        let date, d, birthDateMoment;
        date = person.date;

        let result = {
            year: date.year,
            month: date.month,
            day: date.day,
            hour: date.hour,
            minute: _.isUndefined(date.minutes) ? date.minute : date.minutes,
            skipHour: false
        };

        result.gender = person.gender === 'M' ? 1 : -1;

        if (_.isUndefined(result.hour) || result.hour === null) {
            result.hour = 0;
            result.minute = 0;
            result.timeZone = 0;
            result.longitude = 0;
            result.skipHour = true;
        } else {
            result.timeZone = _.isUndefined(person.tz) ? 0 : person.tz;
            result.longitude = _.isUndefined(person.longitude) ? 0 : person.longitude;
            let dst = person.dst_active_at_birth ? 1 : 0;
            result.longitude = normalizeAngle(result.longitude + 180) - 180;
            result = subtractHour(result, dst, 0);
        }
        birthDateMoment = CommonUtils().getMoment(result);

        let A, AAA, DL, J1, julianDay, trueLongitude, L0, M, S, T;

        result.hour = result.hour + (result.minute / 60);

        // For years before 1585, AAA would be 0
        AAA = 1;
        if (result.year <= 1585) AAA = 0;
        julianDay = -1 * Math.floor(7 * (Math.floor((result.month + 9) / 12) + result.year) / 4);
        S = 1;
        if ((result.month - 9) < 0) S = -1;
        A = Math.abs(result.month - 9);
        J1 = Math.floor(result.year + S * Math.floor(A / 7));
        J1 = -1 * Math.floor((Math.floor(J1 / 100) + 1) * 3 / 4);
        julianDay = julianDay + Math.floor(275 * result.month / 9) + result.day + (AAA * J1);
        julianDay = julianDay + 1721027 + 2 * AAA + 367 * result.year - 0.5;
        result.JZJD = julianDay + (result.hour / 24);
        julianDay = julianDay + (result.hour / 24) - (result.timeZone / 24);

        // Julian centuries from 2000
        T = (julianDay - 2451545.0) / 36525;
        d = 2 * Math.PI / 360;

        // Mean anomaly of the sun
        M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;

        // Geometric mean longitude of the sun
        L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
        // Equation of the sun's center
        DL = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(d * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(d * 2 * M) + 0.000290 * Math.sin(d * 3 * M);

        // True longitude of the sun
        trueLongitude = L0 + DL;

        // bring trueLong within [0..360] interval
        result.trueLong = normalizeAngle(trueLongitude);
        result.moment = birthDateMoment;

        return result;
    }

    function nextHSIndex(hsIndex, step) {
        let resultIndex = hsIndex;
        resultIndex += step;
        if ((resultIndex > 10) || (resultIndex < 0)) {
            resultIndex -= 10 * step;
        }
        return resultIndex;
    }

    function nextEBIndex(ebIndex, step) {
        let resultIndex = ebIndex;
        resultIndex += step;
        if ((resultIndex > 12) || (resultIndex < 0)) {
            resultIndex -= 12 * step;
        }
        return resultIndex;
    }

    function getMonthBranchData(trueLongitude, FW) {
        let resultData = {};
        let sector = getSector(trueLongitude);
        resultData.index = (sector + 4) % 12;

        let incr = resultData.index - 3;
        resultData.increment = incr < 1 ? incr + 12 : incr;
        resultData.increment = resultData.increment % 12;

        let min = sector * 30 - 15;
        min = min < 0 ? min + 360 : min;
        let max = sector * 30 + 15;

        let LP;
        if (FW === 1) {
            LP = ((max - trueLongitude) / 3);
        } else {
            LP = ((trueLongitude - min) / 3);
        }

        if (LP > 11) {
            LP = LP - 120
        }
        if (LP < 0) {
            LP = LP + 120
        }
        resultData.LP = LP;
        return resultData;
    }

    function getSector(angle) {
        return Math.floor(angle / 30 + 0.5) % 12;
    }

    function isNearNumber(number, compareWithNumber, precision) {
        return number > (compareWithNumber - precision) && number < (compareWithNumber + precision);
    }

    function isLongitudeInBetweenSeasons(trueLong) {
        let result;
        let intervals = [
            'Senin stralucitor.',
            'Inceputul verii.',
            'Semanatul de primavara.',
            'Lesser Heat.',
            'Inceputul toamnei.',
            'Roua alba.',
            'Roua rece.',
            'Inceputul iernii.',
            'Mai multa zapada.',
            'Micul ger.',
            'Inceputul primaverii.',
            'Trezirea insectelor.'
        ];
        for (let i = 0; i < 12; i++) {
            if (isNearNumber(trueLong, i * 30 + 15, 0.05)) {
                result = intervals[i];
            }
        }
        return result;
    }

    return {
        getData: getAstroData,
        nextHSIndex: nextHSIndex,
        nextEBIndex: nextEBIndex,
        getMonthBranch: getMonthBranchData,
        getSector: getSector,
        subtractHour: subtractHour,
        isLongitudeInBetweenSeasons: isLongitudeInBetweenSeasons
    };
};

module.exports = astro;