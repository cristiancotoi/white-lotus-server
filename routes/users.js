var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.body);
    res.send('respond with a resource');
});

router.post('/api/users', function (req, res, next) {
    console.log(req.body);
});

router.post('/', function (req, res, next) {
    console.log(req.body);
});

module.exports = router;
