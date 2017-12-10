'use strict';

let DM = require('../../../models/bazi/day-master');

let dayMaster = function () {
    function getDM(resultData) {
        let dmName = resultData.chart.chart.day.hs;
        let promise = DM.find({id: dmName}).exec();

        return promise.then(function (dm) {
            resultData.dm = dm[0].toObject();
        });
    }

    function aggregate(resultData, rules) {
        let promises = [];

        if (rules.includes('dm')) {
            promises.push(getDM(resultData));
        }

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = dayMaster;