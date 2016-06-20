'use strict';

var Person = require('../models/person');

var express = require('express');
var _ = require('underscore');

var BaZiMain = require('../bazi_module/main');
var CommonUtils = require('../common_module/utils');

var router = express.Router();

router.route('/bazi/:id')
    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err)
                res.send(err);
            else {
                CommonUtils().getUser(person.analystId)
                    .then(function (user) {
                        var userLevel = _.isUndefined(user) ? 1 : user.level;
                        BaZiMain(person, res).make(userLevel);
                    }, function(err) {
                        res.send(err);
                    });
            }
        });
    });

module.exports = router;
