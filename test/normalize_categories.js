const { expect } = require('chai');

const { normalizeCategories } = require('../src/categories');

describe('normalizeCategories', () => {
    const tests = [
        {
            input: undefined,
            expected: [],
        },
        {
            input: 'Foo',
            expected: [],
        },
        {
            input: ['Foo', 'Bar', {}],
            expected: ['Foo', 'Bar', '[object Object]'],
        },
        {
            input: [['Electronics', 'Cell Phones'], '  On Sale  '],
            expected: [['Electronics', 'Cell Phones'], 'On Sale'],
        },
        {
            input: [['Electronics'], ['On Sale']],
            expected: ['Electronics', 'On Sale'],
        },
        {
            input: [[], [], 'On Sale', [], '  '],
            expected: ['On Sale'],
        },
    ];

    tests.forEach(({ input, expected }) => {
        const j = JSON.stringify;
        it(`normalizes ${j(input)} to ${j(expected)}`, () => {
            const actual = normalizeCategories(input);
            expect(actual).to.deep.equal(expected);
        });
    });
});
