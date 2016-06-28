'use strict';

var _ = require("underscore");

var utils = function () {
    function stripDbIds(obj) {
        if (_.isArray(obj)) {
            _.each(obj, stripDbIds);
        } else if (_.isObject(obj)) {
            if (!_.isUndefined(obj) && _.isFunction(obj.toObject)) {
                obj = obj.toObject();
            }
            delete obj._id;
            _.each(obj, stripDbIds);
        }
    }

    function getUser(analystId) {
        var User = require('../models/user');

        return User
            .find({analystId: analystId})
            .exec()
            .then(function (data) {
                return data[0];
            });
    }

    return {
        stripDbIds: stripDbIds,
        getUser: getUser
    };
};

module.exports = utils;