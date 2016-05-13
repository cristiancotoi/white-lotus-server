'use strict';

var _ = require("underscore");
var AstroCalc = require('./astro');

function BaZiCalculator(input) {
    var astroCalc = AstroCalc();
    var yearStem, yearBranch, monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch;
    var FW, LP;
    var i;
    var monthStemIndex, yearStemIndex, yearBranchIndex;
    var dayStemIndex, db0, hs0, hs1, hb0;
    var luckPStems = [], luckPBranches = [];
    var indexS, indexB;
    var str01, str00, str1, str2;
    var hourHidS, dayHidS, monthHidS, yearHidS;

    var gon = ["癸 A-", "甲 L+", "乙 L-", "丙 F+", "丁 F-", "戊 P+", "己 P-",
        "庚 M+", "辛 M-", "壬 A+", "癸 A-"];
    var ji = ["亥 hài", "子 zǐ", "丑 chǒu", "寅 yín", "卯 mǎo", "辰 chén", "巳 sì",
        "午 wǔ", "未 wèi", "申 shēn", "酉 yǒu", "戌 xū", "亥 hài", "子 zǐ"];

    function nextHSIndex(hsIndex, step) {
        var resultIndex = hsIndex;
        resultIndex += step;
        if ((resultIndex > 10) || (resultIndex < 0)) {
            resultIndex -= 10 * FW
        }
        return resultIndex;
    }

    function nextEBIndex(ebIndex, step) {
        var resultIndex = ebIndex;
        resultIndex += step;
        if ((resultIndex > 12) || (resultIndex < 0)) {
            resultIndex -= 12 * FW
        }
        return resultIndex;
    }

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
            if (input == '') {
                //console.log("Date is invalid");
                return;
            }

            var astroData = astroCalc.getData(input);
            var trueLong = astroData.trueLong;
            if ((trueLong < 315) && (astroData.MM == 1 || astroData.MM == 2)) {
                yearStemIndex = astroData.YY - 4;
                yearBranchIndex = astroData.YY - 4;
            } else {
                yearStemIndex = astroData.YY - 3;
                yearBranchIndex = astroData.YY - 3;
            }
            yearStemIndex = yearStemIndex % 10;
            yearBranchIndex = yearBranchIndex % 12;
            yearStem = gon[yearStemIndex];

            // Calculate forward step
            FW = (yearStemIndex % 2 == 0) ? (-1) * astroData.GEN : astroData.GEN;
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
            //form.comment1.value = "";
            //form.comment2.value = "";
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
            if ((trueLong >= 315) && (trueLong < 345)) {
                monthBranch = ji[3];
                luckPBranches[0] = 3;
                if (FW == 1) {
                    LP = ((345 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 315) / 3)
                }
            }
            if ((trueLong >= 345) || (trueLong < 15)) {
                monthBranch = ji[4];
                luckPBranches[0] = 4;
                monthStemIndex += 1;
                if (FW == 1) {
                    LP = ((375 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 345) / 3)
                }
                if (LP > 11) {
                    LP = LP - 120
                }
                if (LP < 0) {
                    LP = LP + 120
                }
            }
            if ((trueLong >= 15) && (trueLong < 45)) {
                monthBranch = ji[5];
                luckPBranches[0] = 5;
                monthStemIndex += 2;
                if (FW == 1) {
                    LP = ((45 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 15) / 3)
                }
            }
            if ((trueLong >= 45) && (trueLong < 75)) {
                monthBranch = ji[6];
                luckPBranches[0] = 6;
                monthStemIndex += 3;
                if (FW == 1) {
                    LP = ((75 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 45) / 3)
                }
            }
            if ((trueLong >= 75) && (trueLong < 105)) {
                monthBranch = ji[7];
                luckPBranches[0] = 7;
                monthStemIndex += 4;
                if (FW == 1) {
                    LP = ((105 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 75) / 3)
                }
            }
            if ((trueLong >= 105) && (trueLong < 135)) {
                monthBranch = ji[8];
                luckPBranches[0] = 8;
                monthStemIndex += 5;
                if (FW == 1) {
                    LP = ((135 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 105) / 3)
                }
            }
            if ((trueLong >= 135) && (trueLong < 165)) {
                monthBranch = ji[9];
                luckPBranches[0] = 9;
                monthStemIndex += 6;
                if (FW == 1) {
                    LP = ((165 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 135) / 3)
                }
            }
            if ((trueLong >= 165) && (trueLong < 195)) {
                monthBranch = ji[10];
                luckPBranches[0] = 10;
                monthStemIndex += 7;
                if (FW == 1) {
                    LP = ((195 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 165) / 3)
                }
            }
            if ((trueLong >= 195) && (trueLong < 225)) {
                monthBranch = ji[11];
                luckPBranches[0] = 11;
                monthStemIndex += 8;
                if (FW == 1) {
                    LP = ((225 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 195) / 3)
                }
            }
            if ((trueLong >= 225) && (trueLong < 255)) {
                monthBranch = ji[12];
                luckPBranches[0] = 12;
                monthStemIndex += 9;
                if (FW == 1) {
                    LP = ((255 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 225) / 3)
                }
            }
            if ((trueLong >= 255) && (trueLong < 285)) {
                monthBranch = ji[1];
                luckPBranches[0] = 1;
                monthStemIndex += 10;
                if (FW == 1) {
                    LP = ((285 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 255) / 3)
                }
            }
            if ((trueLong >= 285) && (trueLong < 315)) {
                monthBranch = ji[2];
                luckPBranches[0] = 2;
                monthStemIndex += 11;
                if (FW == 1) {
                    LP = ((315 - trueLong) / 3)
                } else {
                    LP = ((trueLong - 285) / 3)
                }
            }
            if (monthStemIndex > 10) {
                monthStemIndex = monthStemIndex - 10;
            }
            monthStemIndex = monthStemIndex % 10;
            monthStem = gon[monthStemIndex];
            //luckPStems[0] = monthStemIndex;
            indexS = monthStemIndex;
            var JZJD =astroData.JZJD,
                HR = astroData.HR;
            dayStemIndex = "" + Math.floor(JZJD + 0.5);
            dayStem = gon[dayStemIndex.substring(6, 7)];
            db0 = Math.floor(JZJD - 12 * Math.floor((JZJD + 0.5) / 12) + 0.5) + 2;
            dayBranch = ji[db0];
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
            LP = (Math.floor(LP * 100) / 100);

            hourHidS = getHiddenStems(hourBranch);
            dayHidS = getHiddenStems(dayBranch);
            monthHidS = getHiddenStems(monthBranch);
            yearHidS = getHiddenStems(yearBranch);


            for (i = 0; i < 10; i++) {
                luckPBranches[0] = luckPBranches[0] + FW;
                if ((luckPBranches[0] > 12) || (luckPBranches[0] < 0)) {
                    luckPBranches[0] = luckPBranches[0] - 12 * FW;
                }
                luckPBranches[i] = ji[luckPBranches[0]];
            }

            indexB = luckPBranches[0];
            //var indexS = luckPStems[0];
            for (i = 0; i < 9; i++) {
                indexB = nextEBIndex(indexB, FW);
                luckPBranches[i] = ji[indexB];

                indexS = nextHSIndex(indexS, FW);
                luckPStems[i] = gon[indexS];
            }

            return {
                chart: {
                    year: {hs: yearStem, eb: yearBranch, hidStems: yearHidS},
                    month: {hs: monthStem, eb: monthBranch, hidStems: monthHidS},
                    day: {hs: dayStem, eb: dayBranch, hidStems: dayHidS},
                    hour: {hs: hourStem, eb: hourBranch, hidStems: hourHidS}
                },
                luck: {},
                /*"An": new Binomial(ys, yb),
                 "Luna": new Binomial(ms, mb),
                 "Zi": new Binomial(ds, db),
                 "Ora": new Binomial(hs, hb),*/
                comment1: str1,
                comment2: str2,
                'an start': LP,
                fw: FW
            };
        }
    };
}

module.exports = BaZiCalculator;