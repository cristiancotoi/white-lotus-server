'use strict';

var User = require('../models/user');

var Utils = require('./utils');

var users = function (response) {
    function getUser(userId) {
        return User
            .find({analystId: userId})
            .exec()
            .then(function (data) {
                return data[0];
            });
    }

    return {
        getUser: getUser
    };
};

module.exports = users;