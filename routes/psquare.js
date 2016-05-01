/**
 * .
 */

var Person = require('../models/person');
var OperationalNumber = require('../models/psquare/op-number');

var express = require('express');
var pSquare = require('../psquare_module/main');

//configure routes

var router = express.Router();

router.route('/psquare/:id')
    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err)
                res.send(err);
            var d = person.date;
            res.json({
                message: 'Pythagorean square ' + person._id,
                report: pSquare(d)
            });
        });
    });

router.route('/psquare-data/op')
    .get(function (req, res) {
        OperationalNumber.find(function (err, opNumbers) {
            if (err)
                res.send(err);
            res.json(opNumbers);
        });
    });

router.route('/psquare-data/numbers')
    .get(function (req, res) {
        OperationalNumber.find(function (err, opNumbers) {
            if (err)
                res.send(err);
            res.json(opNumbers);
        });
    });


module.exports = router;
