'use strict';

var Person = require('../models/person');

var express = require('express');
var bazi = require('../bazi_module/main');


var router = express.Router();

router.route('/bazi/:id')
    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err)
                res.send(err);
            else
                bazi(person, res);
        });
    });

module.exports = router;
