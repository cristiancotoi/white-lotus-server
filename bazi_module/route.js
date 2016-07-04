'use strict';

var _ = require('underscore');

var Person = require('../models/person');
var BaZiMain = require('./main');
var CommonUtils = require('../common_module/utils');

function baZiGetRoute(req, res) {
    Person.findOne({_id: req.params.id}, function (err, person) {
        if (err) {
            res.send(err);
        } else {
            CommonUtils().getUser(person.analystId)
                .then(function (user) {
                    var userLevel = _.isUndefined(user) ? 1 : user.level;
                    BaZiMain(person, res).make(userLevel);
                }, function (err) {
                    res.send(err);
                });
        }
    });
}

module.exports = baZiGetRoute;
