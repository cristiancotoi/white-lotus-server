'use strict';

let _ = require("lodash");

let Binomial = require('../../../models/bazi/binomial');

let luckRetriever = function () {

    function getBinomial(resultChart, position, pillar) {
        let promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0].toObject()
        });
    }

    function aggregate(resultData, rules) {
        let promises = [];
        let luck = resultData.chart.luck;
        if (rules.includes('luck')) {
            resultData.detailedLuck = [];
            let luckLen = luck.length;
            for (let i = 0; i < luckLen; i++) {
                promises.push(getBinomial(
                    resultData.detailedLuck, i,
                    luck[i]));
            }
        }

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = luckRetriever;