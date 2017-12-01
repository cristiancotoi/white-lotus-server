'use strict';

let _ = require('lodash');
let express = require('express');

let mainRoute = require('../psquare_module/route');
let calendarRoute = require('../psquare_module/route-calendar');

let router = express.Router();

router.route('/psquare/:id')
    .get(mainRoute);

router.route('/psquare/calendar/:id')
    .get(calendarRoute);


module.exports = router;
