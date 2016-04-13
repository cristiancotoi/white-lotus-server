/**
 * .
 */

var Person = require('../models/person');
var express = require('express');
var pSquare = require('../psquare_module/main');

//configure routes

var router = express.Router();

router.route('/psquare/:id')
    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err)
                res.send(err);

            res.json({
                message: 'Pythagorean square ' + person._id,
                report: pSquare(person.date)
            });
        });
    });

module.exports = router;
