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

    function getStems() {
        return ["癸 A-", "甲 L+", "乙 L-", "丙 F+", "丁 F-", "戊 P+", "己 P-",
            "庚 M+", "辛 M-", "壬 A+", "癸 A-"];
    }

    function getBranches() {
        return ["亥 hài", "子 zǐ", "丑 chǒu", "寅 yín", "卯 mǎo", "辰 chén", "巳 sì",
            "午 wǔ", "未 wèi", "申 shēn", "酉 yǒu", "戌 xū", "亥 hài", "子 zǐ"]
    }

    function isStem(itemName) {
        return _.contains(getStems(), itemName);
    }

    function isBranch(itemName) {
         return _.contains(getBranches(), itemName);
    }

    return {
        getVisibleStems: getVisibleStems,
        getNormalLifeType: getNormalLifeType,

        getStems: getStems,
        isStem: isStem,

        getBranches: getBranches,
        isBranch: isBranch
    };
};

module.exports = utils;