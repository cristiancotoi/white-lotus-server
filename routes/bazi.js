'use strict';

let baZiGetRoute = require('../bazi_module/route');

let express = require('express');
let _ = require('lodash');

let router = express.Router();

router.route('/bazi/:id')
    .get(baZiGetRoute);

module.exports = router;
