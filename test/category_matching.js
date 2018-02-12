import { expect } from 'chai';

import { categoryMatch } from '../src/checks/category';

describe('Category matching', () => {
    const cellPhone = {
        sku: 'cell-phone',
        categories: [
            'Electronics',
            ['Electronics', 'Cell Phones'],
            'Fire Sale',
            ['Brands', 'Apple', 'iPhone'],
        ],
    };

    const tests = [
        {
            desc: 'does not match invalidly formatted input',
            rule: {
                op: 'eq',
                value: {},
            },
            product: cellPhone,
            shouldMatch: false,
        },
        {
            desc: 'matches single segment category',
            rule: {
                property: 'category',
                op: 'eq',
                value: [['Fire Sale']],
            },
            product: cellPhone,
            shouldMatch: true,
        },
        {
            desc: 'matches single segment category regardless of case',
            rule: {
                property: 'category',
                op: 'eq',
                value: [['FIRE Sale']],
            },
            product: cellPhone,
            shouldMatch: true,
        },
        {
            desc: 'matches multi-segment category',
            rule: {
                property: 'category',
                op: 'eq',
                value: [['Electronics', 'Cell Phones']],
            },
            product: cellPhone,
            shouldMatch: true,
        },
        {
            desc: 'does not match on parent category when not specified',
            rule: {
                property: 'category',
                op: 'eq',
                value: [['Brands', 'Apple']],
            },
            product: cellPhone,
            shouldMatch: false,
        },
        {
            desc: 'can be inverted',
            rule: {
                property: 'category',
                op: 'noteq',
                value: [['Electronics', 'Breathalyzers']],
            },
            product: cellPhone,
            shouldMatch: true,
        },
    ];

    tests.forEach(({ desc, rule, product, shouldMatch }) => {
        if (!rule) {
            it(desc);
            return;
        }

        it(desc, () => {
            const params = {
                products: [product],
            };
            const matches = categoryMatch(params, rule);
            expect(matches).to.equal(shouldMatch);
        });
    });
});
