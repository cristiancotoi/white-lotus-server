'use strict';

var _ = require("underscore");

var astro = function () {
    function normalizeAngle(angle) {
        // reduce the angle
        angle = angle % 360;

        // force it to be the positive remainder, so that 0 <= angle < 360
        angle = (angle + 360) % 360;
        return angle;
    }

    function getAstroData(person) {
        var date, d;
        var TZ, DD, MM, YY, HR, MN, GEN, LON;
        if (!_.isUndefined(person) && !_.isUndefined(person.date)) {
            date = person.date;
            MM = date.month;
            DD = date.day;
            YY = date.year;
            HR = date.hour;
            MN = _.isUndefined(date.minutes) ? date.minute : date.minutes;
        } else {
            date = person.date;
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
        TZ = _.isUndefined(person.tz) ? 0 : person.tz;
        GEN = person.gender == 'M' ? 1 : -1;
        LON = _.isUndefined(person.longitude) ? 0 : person.longitude;

        var A, AAA, DL, J1, julianDay, JZJD, trueLongitude, L0, M, S, T;
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
        trueLongitude = L0 + DL;

        // bring trueLong within [0..360] interval
        trueLongitude = normalizeAngle(trueLongitude);

        return {
            MM: MM, YY: YY, HR: HR,
            GEN: GEN, JZJD: JZJD,
            trueLong: trueLongitude
        };
    }

    function nextHSIndex(hsIndex, step) {
        var resultIndex = hsIndex;
        resultIndex += step;
        if ((resultIndex > 10) || (resultIndex < 0)) {
            resultIndex -= 10 * step;
        }
        return resultIndex;
    }

    function nextEBIndex(ebIndex, step) {
        var resultIndex = ebIndex;
        resultIndex += step;
        if ((resultIndex > 12) || (resultIndex < 0)) {
            resultIndex -= 12 * step;
        }
        return resultIndex;
    }

    function getMonthBranchData(trueLongitude, FW) {
        var resultData = {};
        var sector = getSector(trueLongitude);
        resultData.index = (sector + 4) % 12;

        var incr = resultData.index - 3;
        resultData.increment = incr < 1 ? incr + 12 : incr;

        var min = sector * 30 - 15;
        min = min < 0 ? min + 360 : min;
        var max = sector * 30 + 15;

        var LP;
        max = max < 15 ? max + 360 : max;
        if (FW == 1) {
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
        precision = _.isUndefined(precision) ? 0.05 : precision;
        return number > (compareWithNumber - precision) && number < (compareWithNumber + precision);
    }

    function isLongitudeInBetweenSeasons(str1, str2, trueLong) {
        var str01, str00;
        str00 = "Data si ora introdusa de dvs sunt f aproape de Jie, ";
        str01 = "Consultati www.fourpillars.net.";
        str1 = "";
        str2 = "";
        if (trueLong > 314.95 && trueLong < 315.05) {
            str1 = str00 + "Inceputul primaverii.";
            str2 = str01;
        }
        if (trueLong > 344.95 && trueLong < 345.05) {
            str1 = str00 + "Trezirea insectelor.";
            str2 = str01;
        }
        if (trueLong > 14.95 && trueLong < 15.05) {
            str1 = str00 + "Senin stralucitor.";
            str2 = str01;
        }
        if (trueLong > 44.95 && trueLong < 45.05) {
            str1 = str00 + "Inceputul verii.";
            str2 = str01;
        }
        if (trueLong > 74.95 && trueLong < 75.05) {
            str1 = str00 + "Semanatul de primavara.";
            str2 = str01;
        }
        if (trueLong > 104.95 && trueLong < 105.05) {
            str1 = str00 + "Lesser Heat.";
            str2 = str01;
        }
        if (trueLong > 134.95 && trueLong < 135.05) {
            str1 = str00 + "Inceputul toamnei.";
            str2 = str01;
        }
        if (trueLong > 164.95 && trueLong < 165.05) {
            str1 = str00 + "Roua alba.";
            str2 = str01;
        }
        if (trueLong > 194.95 && trueLong < 195.05) {
            str1 = str00 + "Roua rece.";
            str2 = str01;
        }
        if (trueLong > 224.95 && trueLong < 225.05) {
            str1 = str00 + "Inceputul iernii.";
            str2 = str01;
        }
        if (trueLong > 254.95 && trueLong < 255.05) {
            str1 = str00 + "Mai multa zapada.";
            str2 = str01;
        }
        if (trueLong > 284.95 && trueLong < 285.05) {
            str1 = str00 + "Micul ger.";
            str2 = str01;
        }
        return {str1: str1, str2: str2};
    }

    return {
        getData: getAstroData,
        nextHSIndex: nextHSIndex,
        nextEBIndex: nextEBIndex,
        getMonthBranch: getMonthBranchData,
        getSector: getSector,
        isLongitudeInBetweenSeasons: isLongitudeInBetweenSeasons
    };
};

module.exports = astro;