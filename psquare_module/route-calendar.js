'use strict';

let User = require('../models/user');
let Person = require('../models/person');
let OperationalNumber = require('../models/psquare/op-number');

let _ = require('lodash');
let pSquare = require('../psquare_module/main');

let CommonUtils = require('../common_module/utils');

function getRoute(req, res) {
    if (req.params.id) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err) {
                res.send(err);
            }
            else {
                CommonUtils().getUser(person.analystId)
                    .then(function (user) {
                        let userLevel = _.isUndefined(user) ? 1 : user.level;
                        pSquare(person, res).make(userLevel);
                    }, function (err) {
                        res.send(err);
                    });
            }
        });
    } else {
        //res.send();
    }
}

module.exports = getRoute;
