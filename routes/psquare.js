'use strict';

var User = require('../models/user');
var Person = require('../models/person');
var OperationalNumber = require('../models/psquare/op-number');

var express = require('express');
var pSquare = require('../psquare_module/main');

function getUser(analystId) {
    return User
        .find({analystId: analystId})
        .exec()
        .then(function (data) {
            return data[0];
        });
}

var router = express.Router();

router.route('/psquare/:id')
    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err) {
                res.send(err);
            }
            else {
                getUser(analystId)
                    .then(function (user) {
                        var userLevel = _.isUndefined(user) ? 1 : user.level;
                        pSquare(person, res).make(userLevel);
                    }, function(err) {
                        res.send(err);
                    });
            }
        });
    });

router.route('/psquare-data/numbers/:number')
    .get(function (req, res) {
        OperationalNumber.find({number: req.params.number}, function (err, opNumbers) {
            if (err)
                res.send(err);
            res.json(opNumbers);
        });
    });


module.exports = router;
