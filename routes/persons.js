'use strict';

var Person = require('../models/person');
var express = require('express');

//configure routes
var router = express.Router();

router.route('/persons')
    .get(function (req, res) {
        Person.find(function (err, persons) {
            if (err)
                res.send(err);
            else
                res.json(persons);
        });
    })

    .post(function (req, res) {
        var person = new Person(req.body);
        person.save(function (err) {
            if (err)
                res.send(err);
            else
                res.send({message: 'Person Added'});
        });
    });

router.route('/portfolio')
    .post(function (req, res) {
        var body = req.body;
        if (body.analystId == undefined) {
            res.send("Bad request: " + JSON.stringify(body));
            return;
        }

        Person.find(body, function (err, persons) {
            if (err)
                res.send(err);
            else
                res.json(persons);
        });
    });

router.route('/persons/:id')
    .put(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {

            if (err)
                res.send(err);

            let prop;
            for (prop in req.body) {
                person[prop] = req.body[prop];
            }

            // save the person
            person.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Person updated!'});
            });

        });
    })

    .get(function (req, res) {
        Person.findOne({_id: req.params.id}, function (err, person) {
            if (err)
                res.send(err);

            res.json(person);
        });
    })

    .delete(function (req, res) {
        Person.remove({
            _id: req.params.id
        }, function (err, person) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });

module.exports = router;
