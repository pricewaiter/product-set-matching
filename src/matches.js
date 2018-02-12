import { numberMatch } from './checks/number';
import { categoryMatch } from './checks/category';
import { stringMatch } from './checks/string';

import log from './log';

function runChecks(params, rule, sets, type) {
    if (/price/.exec(rule.property)) {
        const result = numberMatch(params, rule);
        log.debug(`Checking for ${type} number match`, rule, result);
        return result;
    }

    if (rule.property === 'product_set') {
        /* eslint-disable no-use-before-define */
        // yes, we know, this can be recursive...
        const result = productSetMatches(params, rule.value[0], sets);
        /* eslint-enable no-use-before-define */
        log.debug(`Checking for ${type} product set match`, rule, result);

        if (rule.op === 'eq') {
            return result;
        } else if (rule.op === 'noteq') {
            return !result;
        }
    }

    if (rule.property === 'category') {
        return categoryMatch(params, rule);
    }

    const result = stringMatch(params, rule);
    log.debug(`Checking for ${type} string match`, rule, result);
    return result;
}

export function productSetMatches(params, productSetId, sets) {
    const set = sets[productSetId];
    if (!set) {
        log.debug(`Missing product set ${set}!`);
        return false;
    }

    let alls = true;
    if (set.all_rules && set.all_rules.length) {
        alls = set.all_rules.every((rule) =>
            runChecks(params, rule, sets, 'all'),
        );
    }

    let anys = true;
    if (set.any_rules && set.any_rules.length) {
        anys = set.any_rules.some((rule) =>
            runChecks(params, rule, sets, 'any'),
        );
    }

    log.debug('Matching summary for ', productSetId, { alls, anys });
    return alls && anys;
}
