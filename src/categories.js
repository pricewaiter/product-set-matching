
// A category is represented as an array of *segments* indicating hierarchy,
// e.g.:
//
//  ["Electronics", "Cell Phones"]
//
// If the category has only one segment, it can be represented as a
// string, e.g. `"Electronics"`.

function normalizeCategorySegment(segment) {
    if (segment === undefined || segment === null) {
        return '';
    }

    return String(segment).trim();
}

function normalizeCategory(category) {
    if (category === null || category === undefined) {
        return '';
    }

    if (Array.isArray(category)) {
        // This should be an array of category segment strings
        const segments = category
            .map(normalizeCategorySegment)
            .filter(segment => segment !== '');

        if (segments.length === 0) {
            return '';
        } else if (segments.length === 1) {
            // Represent single-segment categories more efficiently as strings
            return segments[0];
        }

        return segments;
    }

    return normalizeCategorySegment(category);
}

/**
 * Given unknown category input, normalizes into an array of
 * either strings or arrays of strings.
 */
function normalizeCategories(categories) {
    if (!Array.isArray(categories)) {
        return [];
    }

    return (
        categories
            .map(normalizeCategory)
            .filter(category => category !== '')
    );
}

/**
 * @param  {Array} catA
 * @param  {Array} catB
 * @return {Boolean} Whether the two (normalized) categories match.
 */
function categoriesEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i].toLowerCase() !== b[i].toLowerCase()) {
            return false;
        }
    }

    return true;
}

module.exports = {
    normalizeCategory,
    normalizeCategories,
    categoriesEqual,
};
