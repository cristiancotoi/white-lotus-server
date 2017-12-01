'use strict';

let User = require('../models/user');

let Utils = require('./utils');

let users = function (response) {
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