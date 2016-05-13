'use strict';

var _ = require("underscore");

var astro = function () {
    function normalizeAngle(angle) {
        var newAngle = angle;
        while (newAngle < 0) newAngle += 360;
        while (newAngle > 360) newAngle -= 360;
        return newAngle;
    }

    function getAstroData(input) {
        var date, d;
        var TZ, DD, MM, YY, HR, MN, GEN, LON;
        if (!_.isUndefined(input) && !_.isUndefined(input.day)) {
            //console.log('New');
            MM = input.month;
            DD = input.day;
            YY = input.year;
            HR = input.hour;
            MN = input.minute;
        } else {
            date = input.date;
            MM = date.MM;
            DD = date.DD;
            YY = date.YY;
            HR = date.HR;
            MN = date.MN;
        }
        //console.log('' + DD + '/' + MM + '/' + YY + ' ' + HR + ':' + MN);
        if (YY < 1900) {
            return {
                err: "Invalid year"
            };
        }
        TZ = _.isUndefined(input.tz) ? 0 : input.tz;
        GEN = input.sex == 'M' ? 1 : -1;
        LON = _.isUndefined(input.longitude) ? 0 : input.longitude;

        var A, AAA, DL, J1, julianDay, JZJD, trueLong, L0, M, S, T;
        HR = HR + (MN / 60);
        if ((LON > -181) && (LON < 181)) {
            HR = HR + (LON / 15 - TZ);
        }
        AAA = 1;
        if (YY <= 1585) AAA = 0;
        julianDay = -1 * Math.floor(7 * (Math.floor((MM + 9) / 12) + YY) / 4);
        S = 1;
        if ((MM - 9) < 0) S = -1;
        A = Math.abs(MM - 9);
        J1 = Math.floor(YY + S * Math.floor(A / 7));
        J1 = -1 * Math.floor((Math.floor(J1 / 100) + 1) * 3 / 4);
        julianDay = julianDay + Math.floor(275 * MM / 9) + DD + (AAA * J1);
        julianDay = julianDay + 1721027 + 2 * AAA + 367 * YY - 0.5;
        JZJD = julianDay + (HR / 24);
        julianDay = julianDay + (HR / 24) - (TZ / 24);

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
        trueLong = L0 + DL;

        // bring trueLong within [0..360] interval
        trueLong = normalizeAngle(trueLong);

        return {
            MM: MM, YY: YY, HR: HR,
            GEN: GEN, JZJD: JZJD,
            trueLong: trueLong
        };
    }

    return {
        getData: getAstroData
    };
};

module.exports = astro;