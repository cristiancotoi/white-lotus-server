'use strict';

let User = require('../models/user');
let Person = require('../models/person');
let express = require('express');

//configure routes
let router = express.Router();

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
        let person = new Person(req.body);
        person.save(function (err) {
            if (err)
                res.send(err);
            else
                res.send({message: 'Person Added'});
        });
    });

router.route('/portfolio')
    .post(function (req, res) {
        let body = req.body;
        if (body.analystId == undefined) {
            res.send("Bad request: " + JSON.stringify(body));
            return;
        }

        User
            .find({analystId: body.analystId})
            .exec()
            .then(function (users) {
                let user = users[0];
                if (!users.length) {
                    // If user doesn't exist, create a new one
                    let newUser = new User();
                    newUser.analystId = body.analystId;
                    newUser.roles = ['apprentice'];
                    newUser.level = 1;
                    newUser.save(function (ok) {
                    }, function (err) {
                        console.log(err);
                    })
                }
                return user;
            })
            .then(function (user) {
                Person.find(body, function (err, persons) {
                    if (err)
                        res.send(err);
                    else
                        res.json(persons);
                });
            }, function (err) {
                console.log('Error' + err);
                res.send(err);
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
