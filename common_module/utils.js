'use strict';

var _ = require("underscore");

var utils = function () {
    function stripDbIds(obj) {
        if (_.isObject(obj)) {
            if (!_.isUndefined(obj) && _.isFunction(obj.toObject)) {
                obj = obj.toObject();
            }
            delete obj._id;
            _.each(obj, stripDbIds);

        } else if (_.isArray(obj)) {
            _.each(obj, stripDbIds);
        }
    }

    return {
        stripDbIds: stripDbIds
    };
};

module.exports = utils;