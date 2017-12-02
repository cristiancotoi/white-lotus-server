'use strict';

let _ = require('lodash');

let utils = function (options) {
    let rules = options;

    if (!_.isUndefined(options) && !_.isUndefined(options.level) &&
        isNumeric(options.level)) {

        rules = expandNumericOption(options);
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Expand user level into rules.
     * @param optionslevel user level
     * @returns {{}}
     */
    function expandNumericOption(options) {
        let expandedRules = options;
        if (options.level <= 0) {
            return expandedRules;
        }

        expandedRules['current luck pillar'] = true;
        expandedRules['dm'] = true;

        if (options.level >= 3) {
            expandedRules['gods strength for season'] = true;
            expandedRules['normal life type'] = true;
            expandedRules['gods strength'] = true;
        }

        if (options.level >= 5) {
            expandedRules['branch relations'] = true;
        }

        if (options.level >= 8) {
            expandedRules['shen sha'] = true;
            expandedRules['day star binomial'] = true;
        }
        return expandedRules;
    }

    function includes(item) {
        // undefined = no rules are generated
        // consider everything has to be generated
        let generateAll = _.isUndefined(rules);
        // Rule exists
        let ruleIsValid = !!rules && !!rules[item];
        // console.log(item);
        // console.log(generateAll + ' || ' + ruleIsValid + ' -->' + (generateAll || ruleIsValid) + '\n');
        return generateAll || ruleIsValid;
    }

    return {
        includes: includes,

        // For testing purposes
        expandNumericOption: expandNumericOption
    };
};

module.exports = utils;