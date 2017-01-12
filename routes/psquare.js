'use strict';

var _ = require('underscore');
var express = require('express');

var mainRoute = require('../psquare_module/route');
var calendarRoute = require('../psquare_module/route-calendar');

var router = express.Router();

router.route('/psquare/:id')
    .get(mainRoute);

router.route('/psquare/calendar/:id')
    .get(calendarRoute);


module.exports = router;
