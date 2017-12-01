'use strict';

let Calculator = require('./algorithm/calculator');
let GodsCalculator = require('./report/gods-calculator');
let Stars = require('./algorithm/stars');

let DateUtils = require('./algorithm/date-utils');
let ChartUtils = require('./algorithm/chart-utils');
let CommonUtils = require('../common_module/utils');

let DataRetriever = require('./report/retrievers/data-retriever');
let LuckRetriever = require('./report/retrievers/luck');
let RelationsRetriever = require('./report/retrievers/relations');
let ShenShaRetriever = require('./report/retrievers/shen-sha');

let Rules = require('./report/rules');
let _ = require("lodash");

let baziModule = function (person, response) {
    if (person === null || person === undefined) {
        throw 'Invalid person';
    }

    let utils = DateUtils(person.date);
    let godsCalculator = GodsCalculator();

    function applyGodsStrengthMultiplier(resultData) {
        let stems = resultData.heavenlyStems;
        let godsScore = godsCalculator.getStemsStrength(
            resultData.detailedChart,
            stems,
            resultData.earthlyBranches);
        let scoreForSeason = resultData.godsStrength;
        _.each(godsScore, function (score) {
            let scoreMultiplier = scoreForSeason[score.phase.toLowerCase()];
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

    function postProcessing(resultData, rules) {
        if (rules.includes('gods strength') && !!resultData.godsStrength) {
            applyGodsStrengthMultiplier(resultData);
        }
        if (rules.includes('shen sha') && !!resultData.shenSha) {
            let chart = resultData.chart.chart;
            let outputShenSha = {};
            _.each(
                _.keys(resultData.shenSha),
                function (shenShaKey) {
                    let shensha = resultData.shenSha[shenShaKey];
                    if (shenShaKey === 'the3marvel') {
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
                            let outputKey = key;
                            if (key.indexOf('heavenlynoble') >= 0) {
                                outputKey = 'heavenlynoble';
                            }
                            let starsUtils = Stars();
                            let isSymbStarPresent = starsUtils
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
            let shenShaChart = {};
            let presentStarsDesc = {};
            let shenShaDesc = resultData.shenShaDesc;

            _.mapValues(outputShenSha, function (stars, pillarName) {
                if (pillarName === 'the3marvel') {
                    shenShaChart[pillarName] = stars;
                    presentStarsDesc['the3marvel'] = shenShaDesc['the3marvel'];
                    return;
                }
                shenShaChart[pillarName] = _.groupBy(outputShenSha[pillarName], function (shensha) {
                    return shensha.star;
                });
                _.mapValues(shenShaChart[pillarName], function (starsGroup, name) {
                    let property = ChartUtils().isStem(name) ? 'hs' : 'eb';
                    shenShaChart[pillarName][property] = starsGroup;
                    _.each(starsGroup, function (star) {
                        presentStarsDesc[star.name] = shenShaDesc[star.name];
                    });

                    delete shenShaChart[pillarName][name];
                });
            });
            resultData.shenSha = shenShaChart;
            resultData.shenShaDesc = presentStarsDesc;
        }
    }

    function calculate(options) {
        let rules = Rules(options);

        let chartData = Calculator(person).compute();
        chartData.chart.year.name = 'year';
        chartData.chart.month.name = 'month';
        chartData.chart.day.name = 'day';
        chartData.chart.hour.name = 'hour';

        let resultData = {
            name: person.name,
            surname: person.surname,
            age: utils.getAge(),
            age_string: utils.include(),
            sex: person.gender,

            chart: chartData
        };
        if (rules.includes('current luck pillar')) {
            resultData.currentLuckPillar =
                utils.getCurrentLuckPillar(chartData.startYear)
        }

        // Append data about phases, hs, eb to the result.
        // All these are appended based on the fact
        // that eventually all appear in chart/analysis
        return Promise.all([
            DataRetriever().getAll(resultData, rules),
            RelationsRetriever().getAll(resultData, rules),
            LuckRetriever().getAll(resultData),
            ShenShaRetriever().getAll(resultData, rules)
        ]).then(function () {
            postProcessing(resultData, rules);
            let utils = CommonUtils();
            utils.stripDbIds(resultData);
            // All DB queries are finished - returning the result
            response.json(resultData);
        }, function (err) {
            console.log('Error waiting for promises');
            console.log(err);
        });
        // return resultData;
    }

    return {
        make: calculate
    }
};

module.exports = baziModule;