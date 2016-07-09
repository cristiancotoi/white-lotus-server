'use strict';

var _ = require("underscore");
var moment = require("moment");
var AstroCalc = require('./astro');


function BaZiCalculator(person) {
    var astroCalc = AstroCalc();
    var monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch;
    var FW, LP;
    var i;
    var monthStemIndex;
    var dayStemIndex, hs0, hs1, hb0;
    var luckPStems = [], luckPBranches = [];
    var hourHidS = [], dayHidS, monthHidS, yearHidS;

    var gon = ["癸 A-", "甲 L+", "乙 L-", "丙 F+", "丁 F-", "戊 P+", "己 P-",
        "庚 M+", "辛 M-", "壬 A+", "癸 A-"];
    var ji = ["亥 hài", "子 zǐ", "丑 chǒu", "寅 yín", "卯 mǎo", "辰 chén", "巳 sì",
        "午 wǔ", "未 wèi", "申 shēn", "酉 yǒu", "戌 xū", "亥 hài", "子 zǐ"];

    /**
     * Return an array of hidden stems
     * @param branch target earthly branch
     * @returns {Array} max 3 hidden stems
     */
    function getHiddenStems(branch) {
        var hiddenStems = [];
        if (branch == "亥 hài") {
            hiddenStems[0] = gon[9];
            hiddenStems[1] = gon[1];
            hiddenStems[2] = "";
        }
        if (branch == "子 zǐ") {
            hiddenStems[0] = gon[0];
            hiddenStems[1] = "";
            hiddenStems[2] = "";
        }
        if (branch == "丑 chǒu") {
            hiddenStems[0] = gon[6];
            hiddenStems[1] = gon[0];
            hiddenStems[2] = gon[8];
        }
        if (branch == "寅 yín") {
            hiddenStems[0] = gon[1];
            hiddenStems[1] = gon[3];
            hiddenStems[2] = gon[5];
        }
        if (branch == "卯 mǎo") {
            hiddenStems[0] = gon[2];
            hiddenStems[1] = "";
            hiddenStems[2] = "";
        }
        if (branch == "辰 chén") {
            hiddenStems[0] = gon[5];
            hiddenStems[1] = gon[2];
            hiddenStems[2] = gon[0];
        }
        if (branch == "巳 sì") {
            hiddenStems[0] = gon[3];
            hiddenStems[1] = gon[5];
            hiddenStems[2] = gon[7];
        }
        if (branch == "午 wǔ") {
            hiddenStems[0] = gon[4];
            hiddenStems[1] = gon[6];
            hiddenStems[2] = "";
        }
        if (branch == "未 wèi") {
            hiddenStems[0] = gon[6];
            hiddenStems[1] = gon[4];
            hiddenStems[2] = gon[2];
        }
        if (branch == "申 shēn") {
            hiddenStems[0] = gon[7];
            hiddenStems[1] = gon[9];
            hiddenStems[2] = gon[5];
        }
        if (branch == "酉 yǒu") {
            hiddenStems[0] = gon[8];
            hiddenStems[1] = "";
            hiddenStems[2] = "";
        }
        if (branch == "戌 xū") {
            hiddenStems[0] = gon[5];
            hiddenStems[1] = gon[8];
            hiddenStems[2] = gon[4];
        }
        return hiddenStems;
    }

    return {
        compute: function () {
            if (_.isUndefined(person) ||
                (_.isObject(person) && _.isUndefined(person.date))) {
                throw 'Person object is invalid';
            }

            var astroData = astroCalc.getData(person);
            var trueLong = astroData.trueLong;

            var yearStem, yearBranch, yearStemIndex, yearBranchIndex;
            if ((trueLong < 315) && (astroData.month == 1 || astroData.month == 2)) {
                yearStemIndex = astroData.year - 4;
                yearBranchIndex = astroData.year - 4;
            } else {
                yearStemIndex = astroData.year - 3;
                yearBranchIndex = astroData.year - 3;
            }
            yearStemIndex = yearStemIndex % 10;
            yearBranchIndex = yearBranchIndex % 12;
            yearStem = gon[yearStemIndex];

            // Calculate forward step
            FW = (yearStemIndex % 2 == 0) ? (-1) * astroData.gender : astroData.gender;
            yearBranch = ji[yearBranchIndex];


            monthStemIndex = 1;
            for (i = 0; i < 6; i++) {
                if ((yearStemIndex == i) || (yearStemIndex == i + 5)) {
                    monthStemIndex = monthStemIndex + (i * 2);
                    if (monthStemIndex > 10) {
                        monthStemIndex = monthStemIndex - 10;
                    }
                }
            }

            var mb = astroCalc.getMonthBranch(trueLong, FW);
            monthBranch = ji[mb.index];
            monthStemIndex += mb.increment;
            LP = mb.LP;
            if (monthStemIndex > 10) {
                monthStemIndex = monthStemIndex - 10;
            }
            monthStemIndex = monthStemIndex % 10;
            monthStem = gon[monthStemIndex];

            var JZJD = astroData.JZJD,
                HR = astroData.hour;
            dayStemIndex = "" + Math.floor(JZJD + 0.5);
            dayStem = gon[dayStemIndex.substring(6, 7)];
            var db0 = Math.floor(JZJD - 12 * Math.floor((JZJD + 0.5) / 12) + 0.5) + 2;
            dayBranch = ji[db0];

            if (!astroData.skipHour) {
                hs0 = 1;
                hs1 = 0;
                for (i = 1; i < 5; i++) {
                    if ((eval(dayStemIndex.substring(6, 7)) == i) || (eval(dayStemIndex.substring(6, 7)) == i + 5)) {
                        hs1 = hs0;
                    }
                    hs0 = hs0 + 2;
                }
                if ((eval(dayStemIndex.substring(6, 7)) == 0) || (eval(dayStemIndex.substring(6, 7)) == 5)) {
                    hs1 = 9;
                }
                if ((HR == 23) || (HR > 23 && HR < 24)) {
                    hs1 = hs1 + 2;
                }
                if (((HR == 23) || (HR > 23 && HR < 24)) || ((HR == 0) || (HR > 0 && HR < 1) || (HR == 24))) {
                    hourBranch = ji[1];
                }
                hb0 = 2;
                for (i = 1; i < 23; i++) {
                    if ((HR == i) || (HR > i && HR < i + 2)) {
                        hourBranch = ji[hb0];
                        hs1 = hs1 + hb0 - 1;
                    }
                    i = i + 1;
                    hb0 = hb0 + 1;
                }
                if (hs1 > 10) {
                    hs1 = hs1 - 10
                }
                hourStem = gon[hs1];

                hourHidS = getHiddenStems(hourBranch);
            }
            LP = (Math.floor(LP * 100) / 100);

            dayHidS = getHiddenStems(dayBranch);
            monthHidS = getHiddenStems(monthBranch);
            yearHidS = getHiddenStems(yearBranch);

            var indexS, indexB;
            indexB = mb.index;
            indexS = monthStemIndex;
            var luck = [];
            var birthDateMoment = moment(astroData.moment);
            var firstLuckStart = birthDateMoment.add(LP, 'years');
            var nextLuckStart;
            for (i = 0; i < 9; i++) {
                indexB = astroCalc.nextEBIndex(indexB, FW);
                luckPBranches[i] = ji[indexB];

                indexS = astroCalc.nextHSIndex(indexS, FW);
                luckPStems[i] = gon[indexS];

                nextLuckStart = moment(firstLuckStart).add(10, 'years');
                luck[i] = {
                    hs: gon[indexS], eb: ji[indexB],
                    start: firstLuckStart.format('DD-MM-YYYY'),
                    end: nextLuckStart.format('DD-MM-YYYY')
                };
                firstLuckStart = moment(nextLuckStart);
            }

            var chart = {
                year: {hs: yearStem, eb: yearBranch, hidStems: yearHidS},
                month: {hs: monthStem, eb: monthBranch, hidStems: monthHidS},
                day: {hs: dayStem, eb: dayBranch, hidStems: dayHidS},
                hour: {hs: hourStem, eb: hourBranch, hidStems: hourHidS}
            };

            return {
                chart: chart,
                luck: luck,
                astro: astroData,
                comment1: astroCalc.isLongitudeInBetweenSeasons(trueLong),
                startYear: LP,
                fw: FW
            };
        }
    };
}

module.exports = BaZiCalculator;