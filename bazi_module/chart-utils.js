'use strict';

var moment = require('moment-timezone');
var _ = require('underscore');

var utils = function () {
    function getVisibleStems(chart) {
        var result = [
            chart.year.hs,
            chart.month.hs,
            chart.day.hs
        ];
        if (!_.isUndefined(chart.hour)) {
            result.push(chart.hour.hs);
        }
        return result;
    }

    function getNormalLifeType(chart) {
        var result;
        var seasonHidStems = chart.month.hidStems;
        var stems = getVisibleStems(chart);

        if (_.indexOf(stems, seasonHidStems[0]) > -1) {
            result = seasonHidStems[0];
        }

        if (_.isUndefined(result) && _.indexOf(stems, seasonHidStems[1]) > -1) {
            result = seasonHidStems[1];
        }
        result = _.isUndefined(result) ? seasonHidStems[0] : result;
        return result;
    }

    function getBinomialStarOfDay(chart, stars) {
        var result = {};
        var seasonId = chart.month.eb;
        var dm = chart.day.hs;
        var dayBranch = chart.day.eb;
        // SteleBinomZi
        _.each(stars, function (star) {
            if ((star.season === seasonId && star.hs == dm && star.eb == dayBranch) ||
                (_.isUndefined(star.season) && star.hs == dm && star.eb == dayBranch)) {
                result[star.category] = star;
            }
        });
        return result;
    }

    return {
        getVisibleStems: getVisibleStems,
        getNormalLifeType: getNormalLifeType,
        getBinomialStarOfDay: getBinomialStarOfDay
    };
};

module.exports = utils;