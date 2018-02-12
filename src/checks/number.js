function numberMatch(params, rule) {
    // NOTE: Product sets do *not* store price data in cents.
    const ruleValue = rule.value.map((nonCentsValue) =>
        Math.round(nonCentsValue * 100),
    );
    const productValue = params.products[0][`${rule.property}_cents`];
    let match = false;
    switch (rule.op) {
        case 'eq':
            if (productValue === ruleValue[0]) {
                match = true;
            }
            break;
        case 'below':
            if (productValue < ruleValue[0]) {
                match = true;
            }
            break;
        case 'above':
            if (productValue > ruleValue[0]) {
                match = true;
            }
            break;
        case 'between':
            if (productValue >= ruleValue[0] && productValue <= ruleValue[1]) {
                match = true;
            }
            break;
        default:
            break;
    }
    return match;
}

module.exports = {
    numberMatch,
};
