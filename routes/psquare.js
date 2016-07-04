'use strict';

var _ = require('underscore');
var express = require('express');

var routeFunction = require('../psquare_module/route');

var router = express.Router();

router.route('/psquare/:id')
    .get(routeFunction);


module.exports = router;
