'use strict';

let _ = require("lodash");
let moment = require("moment-timezone");

let utils = function () {
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

    /* istanbul ignore next */
    function getUser(analystId) {
        let User = require('../models/user');

        return User
            .find({analystId: analystId})
            .exec()
            .then(function (data) {
                return data[0];
            });
    }

    function getMoment(dateObj) {
        moment.tz.setDefault('UTC');

        let dateArr = [
            dateObj.year,
            dateObj.month - 1,
            dateObj.day
        ];

        if (!_.isUndefined(dateObj.hour) && dateObj.hour !== null) {
            let min = _.isUndefined(dateObj.minutes) ? dateObj.minute : dateObj.minutes;
            dateArr.push(dateObj.hour, min);
        }

        return moment(dateArr);
    }

    function makePersonFromDate(dateString) {
        /*        date: {
            year: {type: Number, min: 1, max: 9999},
            month: {type: Number, min: 1, max: 12},
            day: {type: Number, min: 1, max: 31},
            hour: {type: Number, min: 0, max: 23},
            minutes: {type: Number, min: 0, max: 59}
        },
        tz: Number,
        birth_city: String,
        dst_active_at_birth: Boolean,
        longitude: {type: Number, min: -360.0, max: 360.0},
        analystId: String,
        gender: String,*/
        
    }

    return {
        getMoment: getMoment,
        stripDbIds: stripDbIds,
        getUser: getUser
    };
};

module.exports = utils;