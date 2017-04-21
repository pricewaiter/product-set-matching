
const log = require('../log');

function stringMatch(params, rule) {
    const ruleValue = (rule.value[0] ? rule.value[0] : '').toLowerCase();
    const prop = params.products[0][rule.property];
    const productValue = (prop || '').toLowerCase();

    let match = false;
    switch (rule.op) {
    case 'eq':
        if (productValue === ruleValue) {
            match = true;
        }
        break;
    case 'noteq':
        if (productValue !== ruleValue) {
            match = true;
        }
        break;
    case 'contains':
        if (productValue.indexOf(ruleValue) >= 0) {
            match = true;
        }
        break;
    case 'notcontains':
        if (productValue.indexOf(ruleValue) < 0) {
            match = true;
        }
        break;
    case 'startswith':
        if (productValue.startsWith(ruleValue)) {
            match = true;
        }
        break;
    case 'endswith':
        if (productValue.endsWith(ruleValue)) {
            match = true;
        }
        break;
    default:
        log(`Product Set matching op not found: ${rule.op}`);
        break;
    }
    return match;
}

module.exports = {
    stringMatch,
};
