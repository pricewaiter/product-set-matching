// this file comes from automation service.
// TODO: share code with automation

// A category is represented as an array of *segments* indicating hierarchy,
// e.g.:
//
//  ["Electronics", "Cell Phones"]
//
// If the category has only one segment, it can be represented as a
// string, e.g. `"Electronics"`.

/**
 * Given arbitrary input, returns an array of category segments.
 * @param  {String|Array} category The category segment data
 * @return {Array} The set of category segments.
 */
function normalizeCategory(category) {
    const result = Array.isArray(category) ? category : [category];
    return (
        result
            .map((segment) => {
                if (segment === null || segment === undefined) {
                    return '';
                }
                return String(segment).trim();
            })
            .filter(segment => segment !== '')
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
    categoriesEqual,
};
