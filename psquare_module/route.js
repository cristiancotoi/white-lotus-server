'use strict';

var User = require('../models/user');
var Person = require('../models/person');
var OperationalNumber = require('../models/psquare/op-number');

var _ = require('underscore');
var pSquare = require('../psquare_module/main');

var CommonUtils = require('../common_module/utils');

function getRoute(req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err) {
                res.send(err);
            }
            else {
                CommonUtils().getUser(person.analystId)
                    .then(function (user) {
                        var userLevel = _.isUndefined(user) ? 1 : user.level;
                        pSquare(person, res).make(userLevel);
                    }, function(err) {
                        res.send(err);
                    });
            }
        });
    }

module.exports = getRoute;
