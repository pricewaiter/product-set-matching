import log from '../log';

export function stringMatch(params, rule) {
    const prop = params.products[0][rule.property];
    let ruleValue = (rule.value[0] ? rule.value[0] : '').toLowerCase();
    let productValue = (prop || '').toLowerCase();

    // normalize double spaces to single
    productValue = productValue.replace(/[ ]+/g, ' ').trim();
    ruleValue = ruleValue.replace(/[ ]+/g, ' ').trim();

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
            log.debug(`Product Set matching op not found: ${rule.op}`);
            break;
    }
    return match;
}
