const sortAutomationRules = require('./sort');
const { productSetMatches } = require('./matches');

function getProductMatches(params, rules, sets) {
    return sortAutomationRules(
        rules.filter(
            (rule) =>
                rule.enabled &&
                productSetMatches(params, rule.product_set, sets),
        ),
    );
}

module.exports = {
    getProductMatches,
};
