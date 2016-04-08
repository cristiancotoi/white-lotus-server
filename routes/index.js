var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Persons = require('./../models/Persons.js');
var Person = mongoose.model('Person');
//var Phase = mongoose.model('Phases');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/persons', function (req, res, next) {
    Person.find(function (err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
});

router.post('/posts', function(req, res, next) {
    var person = new Person(req.body);

    person.save(function(err, post){
        if(err){ return next(err); }

        res.json(post);
    });
});
module.exports = router;
