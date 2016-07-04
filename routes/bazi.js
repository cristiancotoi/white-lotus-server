'use strict';

var baZiGetRoute = require('../bazi_module/route');
var Person = require('../models/person');

var express = require('express');
var _ = require('underscore');

var router = express.Router();

router.route('/bazi/:id')
    .get(baZiGetRoute);

module.exports = router;
