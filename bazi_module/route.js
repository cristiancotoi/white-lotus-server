'use strict';

let _ = require('lodash');

let Person = require('../models/person');
let BaZiMain = require('./main');
let CommonUtils = require('../common_module/utils');

function getIdRoute(req, res) {
    Person.findOne({_id: req.params.id}, function (err, person) {
        if (err) {
            res.send(err);
        } else {
            CommonUtils()
                .getUser(person.analystId)
                .then(function (user) {
                    let userLevel = _.isUndefined(user) ? 1 : user.level;
                    BaZiMain(person).make(userLevel, res);
                }, function (err) {
                    res.send(err);
                });
        }
    });
}

/**
 * Return a simple chart
 */
function getChartRoute(req, res) {
    BaZiMain(req.params.date, res).make(1);
}

module.exports = {
    "getId": getIdRoute,
    "getChart": getChartRoute
};
