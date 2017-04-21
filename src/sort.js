
module.exports = function sortAutomationRules(rules) {
    return rules.sort((a, b) => {
        if (b.sort_index === undefined || (a.sort_index < b.sort_index)) {
            return -1;
        }
        if (a.sort_index === undefined || (a.sort_index > b.sort_index)) {
            return 1;
        }

        return 0;
    });
};
