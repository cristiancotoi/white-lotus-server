'use strict';

var Person = require('../models/person');
var OperationalNumber = require('../models/psquare/op-number');

var express = require('express');
var pSquare = require('../psquare_module/main');


var router = express.Router();

router.route('/psquare/:id')
    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err)
                res.send(err);
            else
                pSquare(person, res);
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
