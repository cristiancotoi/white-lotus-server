'use strict';

let baZiGetRoute = require('../bazi_module/route');

let express = require('express');

let router = express.Router();

router.route('/bazi/:id')
    .get(baZiGetRoute.getId());

router.route('/bazi/simple-chart/:date')
    .get(baZiGetRoute.getChart());

module.exports = router;
