import sortAutomationRules from './sort';
import { productSetMatches } from './matches';

export function getProductMatches(params, rules, sets) {
    return sortAutomationRules(
        rules.filter(
            (rule) =>
                rule.enabled &&
                productSetMatches(params, rule.product_set, sets),
        ),
    );
}
