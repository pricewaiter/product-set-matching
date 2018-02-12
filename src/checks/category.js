const { categoriesEqual, normalizeCategory } = require('../categories');

function categoryMatch(params, rule) {
    if (!Array.isArray(rule.value)) {
        return false;
    }

    const ruleCategories = rule.value.map(normalizeCategory);
    const productCategories = (params.products[0].categories || []).map(
        normalizeCategory,
    );

    const matches = ruleCategories.every((ruleCategory) => {
        // Each category that is specified on the rule should be present
        // in the product's categories
        const index = productCategories.findIndex((productCategory) =>
            categoriesEqual(ruleCategory, productCategory),
        );
        return index >= 0;
    });

    switch (rule.op) {
        case 'eq':
            return matches;
        case 'noteq':
            return !matches;
        default:
            return false;
    }
}

module.exports = {
    categoryMatch,
};
