'use strict';

var _ = require("underscore");

var CommonUtils = require('../common_module/utils');
var ChartUtils = require('./chart-utils');

var Phases = require('../models/bazi/phase');
var HS = require('../models/bazi/heavenly-stem');
var EB = require('../models/bazi/earthly-branch');
var Binomial = require('../models/bazi/binomial');

var DM = require('../models/bazi/day-master');
var GodsStrength = require('../models/bazi/gods-strength');
var BranchRelation = require('../models/bazi/branch-relation');

var Stars = require('./stars');
var ShenShaDescription = require('../models/bazi/shensha-description');
var ShenShaSeason = require('../models/bazi/shensha-season');
var ShenShaDayBranch = require('../models/bazi/shensha-day-branch');
var ShenShaDayMaster = require('../models/bazi/shensha-day-master');
var ShenShaHeavenlyDoctor = require('../models/bazi/shensha-heavenly-doctor');
var ShenShaExternalPeachBlossom = require('../models/bazi/shensha-ext-peach-blossom');
var ShenSha3Marvels = require('../models/bazi/shensha-3-marvels');

var GodsCalculator = require('./gods-calculator');

var binomial = function (response) {
    var calculator = GodsCalculator();


    function arrToMap(arr, keyName) {
        var result = {};
        _.each(arr, function (element) {
            result[element[keyName]] = element.toObject();
        });
        return result;
    }

    function getPhases(resultData) {
        var promise = Phases.find().exec();

        return promise.then(function (phases) {
            resultData.phases = arrToMap(phases, "presc");
        });
    }

    function getHS(resultData) {
        var promise = HS.find().exec();

        return promise.then(function (heavenlyStems) {
            resultData.heavenlyStems = arrToMap(heavenlyStems, "presc");
        });
    }

    function getEB(resultData) {
        var promise = EB.find().exec();

        return promise.then(function (earthlyBranches) {
            resultData.earthlyBranches = arrToMap(earthlyBranches, "presc");
        });
    }

    function getBinomial(resultChart, position, pillar) {
        var promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0].toObject()
        });
    }

    function getDM(resultData) {
        var dmName = resultData.chart.chart.day.hs;
        var promise = DM.find({id: dmName}).exec();

        return promise.then(function (dm) {
            resultData.dm = dm[0].toObject();
        });
    }

    function getGodsStrengthsForSeason(resultData) {
        var seasonName = resultData.chart.chart.month.eb;
        var promise = GodsStrength.find({id: seasonName}).exec();

        return promise.then(function (strength) {
            resultData.godsStrength = strength[0].toObject();
        });
    }

    function getBranchRelations(resultData) {
        var promise = BranchRelation.find().exec();

        return promise.then(function (allRelations) {
            resultData.branchRelations =
                calculator.getMatchingRelations(
                    resultData.chart.chart,
                    allRelations
                );
        });
    }

    function getShenShaDescription(resultData) {
        var promise = ShenShaDescription.find().exec();

        return promise.then(function (allDescriptionsShenSha) {
            resultData.shenShaDesc = allDescriptionsShenSha;
        });
    }

    function getShenShaSeason(resultData) {
        var seasonName = resultData.chart.chart.month.eb;
        var promise = ShenShaSeason.find({id: seasonName}).exec();

        return promise.then(function (allSeasonShenSha) {
            resultData.shenSha.season = allSeasonShenSha[0].toObject();
        });
    }

    function getShenShaDayBranch(resultData) {
        var dayBranch = resultData.chart.chart.day.eb;
        var promise = ShenShaDayBranch.find({id: dayBranch}).exec();

        return promise.then(function (allDayBranchShenSha) {
            resultData.shenSha.dayBranch = allDayBranchShenSha[0].toObject();
        });
    }

    function getShenShaDayMaster(resultData) {
        var dayMaster = resultData.chart.chart.day.hs;
        var promise = ShenShaDayMaster.find({id: dayMaster}).exec();

        return promise.then(function (allDayMasterShenSha) {
            resultData.shenSha.dayMaster = allDayMasterShenSha[0].toObject();
        });
    }

    function getShenShaHeavenlyDoctor(resultData) {
        var seasonName = resultData.chart.chart.month.eb;
        var promise = ShenShaHeavenlyDoctor.find({id: seasonName}).exec();

        return promise.then(function (heavenlyDoctor) {
            resultData.shenSha.heavenlyDoctor = heavenlyDoctor[0].toObject();
        });
    }

    function getShenShaExternalPeachBlossom(resultData) {
        var seasonName = resultData.chart.chart.month.eb;
        var promise = ShenShaExternalPeachBlossom.find({id: seasonName}).exec();

        return promise.then(function (externalPeachBlossom) {
            resultData.shenSha.extPeachBlossom = externalPeachBlossom[0].toObject();
        });
    }

    function getShenSha3Marvels(resultData) {
        var dayMaster = resultData.chart.chart.day.hs;
        var promise = ShenSha3Marvels.find({id: dayMaster}).exec();

        return promise.then(function (threeMarvels) {
            if (threeMarvels.length &&
                resultData.chart.chart.month.hs === threeMarvels[0].month &&
                resultData.chart.chart.year.hs === threeMarvels[0].year) {
                resultData.shenSha.threeMarvels = threeMarvels[0].toObject();
            }
        });
    }

    function applyGodsStrengthMultiplier(resultData) {
        var stems = resultData.heavenlyStems;
        var godsScore = calculator.getStemsStrength(
            resultData.detailedChart,
            stems,
            resultData.earthlyBranches);
        var scoreForSeason = resultData.godsStrength;
        _.each(godsScore, function (score) {
            var scoreMultiplier = scoreForSeason[score.phase.toLowerCase()];
            score.visible *= scoreMultiplier;
            score.mainHidden *= scoreMultiplier;
            score.prison *= scoreMultiplier;
            score.grave *= scoreMultiplier;
            score.total *= scoreMultiplier;
        });
        resultData.godsScore = godsScore;

        // Lighten up the load we send to the client
        delete resultData.godsStrength;
    }

    function postProcessing(resultData, userLevel) {
        if (userLevel >= 3) {
            applyGodsStrengthMultiplier(resultData);
        }
        if (userLevel >= 8) {
            var chart = resultData.chart.chart;
            var outputShenSha = {};
            _.each(
                _.keys(resultData.shenSha),
                function (shenShaKey) {
                    var shensha = resultData.shenSha[shenShaKey];
                    if (shenShaKey === 'threeMarvels') {
                        outputShenSha[shenShaKey] = {
                            pillars: ['day', 'month', 'year'],
                            star: shensha,
                            type: shenShaKey
                        };
                    } else {
                        _.each(_.keys(shensha), function (key) {
                            if (key.indexOf('_id') >= 0) {
                                return;
                            }
                            var outputKey = key;
                            if (key.indexOf('heavenlynoble') >= 0) {
                                outputKey = 'heavenlynoble';
                            }
                            var starsUtils = Stars();
                            var isSymbStarPresent = starsUtils
                                .isSymbolicStarPresent(chart, shensha[key], shenShaKey);

                            _.each(isSymbStarPresent.pillars, function (pillarName) {
                                if (_.isUndefined(outputShenSha[pillarName])) {
                                    outputShenSha[pillarName] = [];
                                }
                                outputShenSha[pillarName].push({
                                    name: outputKey,
                                    star: isSymbStarPresent.star,
                                    type: isSymbStarPresent.type,
                                    position: pillarName
                                });
                            });
                        });
                    }
                }
            );

            /*
             * Reshape the stars into a chart object for easier display
             */
            var chart = {};
            _.mapObject(outputShenSha, function (stars, pillarName) {
                if (pillarName === 'threeMarvels') {
                    chart[pillarName] = stars;
                    return;
                }
                chart[pillarName] = _.groupBy(outputShenSha[pillarName], function (shensha) {
                    return shensha.star;
                });
                _.mapObject(chart[pillarName], function (starsGroup, name) {
                    var property = ChartUtils().isStem(name) ? 'hs' : 'eb';
                    chart[pillarName][property] = starsGroup;
                    delete chart[pillarName][name];
                });
            });
            resultData.shenSha = chart;
        }
    }

    function aggregate(resultData, userLevel) {
        var promises = [];
        var chart = resultData.chart.chart;
        var luck = resultData.chart.luck;
        resultData.detailedChart = {};
        resultData.detailedLuck = [];
        var luckLen = luck.length;

        promises.push(getPhases(resultData));
        promises.push(getHS(resultData));
        promises.push(getEB(resultData));

        promises.push(getBinomial(
            resultData.detailedChart, 'year',
            chart.year));
        promises.push(getBinomial(
            resultData.detailedChart, 'month',
            chart.month));
        promises.push(getBinomial(
            resultData.detailedChart, 'day',
            chart.day));
        if (!_.isUndefined(chart.hour.hs)) {
            promises.push(getBinomial(
                resultData.detailedChart, 'hour',
                chart.hour));
        }
        for (var i = 0; i < luckLen; i++) {
            promises.push(getBinomial(
                resultData.detailedLuck, i,
                luck[i]));
        }

        promises.push(getDM(resultData));

        if (userLevel >= 3) {
            promises.push(getGodsStrengthsForSeason(resultData));
        }

        if (userLevel >= 5) {
            promises.push(getBranchRelations(resultData));
        }

        // Shen Sha
        if (userLevel >= 8) {
            resultData.shenSha = {};
            promises.push(getShenShaDescription(resultData));

            promises.push(getShenShaSeason(resultData));
            promises.push(getShenShaDayBranch(resultData));
            promises.push(getShenShaDayMaster(resultData));
            promises.push(getShenShaExternalPeachBlossom(resultData));
            promises.push(getShenShaHeavenlyDoctor(resultData));
            promises.push(getShenSha3Marvels(resultData));
        }

        Promise.all(promises).then(function () {
            postProcessing(resultData, userLevel);
            var utils = CommonUtils();
            utils.stripDbIds(resultData);
            // All DB queries are finished - returning the result
            response.json(resultData);

        }, function (err) {
            console.log('Error waiting for promises');
            console.log(err);
        });
        return resultData;
    }

    return {
        getAllInto: aggregate
    };
};

module.exports = binomial;