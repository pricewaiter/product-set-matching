import { expect } from 'chai';
import { getProductMatches } from '../src/';
import { params, rules, sets } from './data/product_set_matching';

describe('product set matching references other product sets', () => {
    it('checks 1 degree away', () => {
        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        const setIdB = 'e6ecd8e8-3cc8-11e6-ac61-9e71128cae77';
        sets[setIdB] = {
            id: setIdB,
            all_rules: [
                {
                    op: 'contains',
                    value: ['Rad'],
                    property: 'name',
                },
            ],
        };

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: [setIdB],
            property: 'product_set',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('checks 2 degree away', () => {
        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        const setIdB = 'b240fcb0-3d5d-11e6-ac61-9e71128cae77';
        const setIdC = '56c0c5e6-3d5d-11e6-ac61-9e71128cae77';

        sets[setIdB] = {
            id: setIdB,
            all_rules: [
                {
                    op: 'eq',
                    value: ['NIKE'],
                    property: 'brand',
                },
                {
                    op: 'contains',
                    value: ['shoe'],
                    property: 'sku',
                },
            ],
        };

        sets[setIdC] = {
            id: setIdC,
            all_rules: [
                {
                    op: 'eq',
                    value: [setIdB],
                    property: 'product_set',
                },
                {
                    op: 'noteq',
                    value: ['REEBOK'],
                    property: 'name',
                },
            ],
        };

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: [setIdC],
            property: 'product_set',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('checks failure 2 degree away', () => {
        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        const setIdB = 'fb7c9222-3d5d-11e6-ac61-9e71128cae77';
        const setIdC = '000a799e-3d5e-11e6-ac61-9e71128cae77';

        sets[setIdB] = {
            id: setIdB,
            all_rules: [
                {
                    op: 'eq',
                    value: ['NIKE'],
                    property: 'brand',
                },
                {
                    op: 'contains',
                    value: ['shorts'],
                    property: 'sku',
                },
            ],
        };

        sets[setIdC] = {
            id: setIdC,
            all_rules: [
                {
                    op: 'eq',
                    value: [setIdB],
                    property: 'product_set',
                },
            ],
        };

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: [setIdC],
            property: 'product_set',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(0);
    });

    it('supports not equal', () => {
        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        const setIdB = 'e6ecd8e8-3cc8-11e6-ac61-9e71128cae77';
        sets[setIdB] = {
            id: setIdB,
            all_rules: [
                {
                    op: 'contains',
                    value: ['Rad'],
                    property: 'name',
                },
            ],
        };

        sets[rules[0].product_set].all_rules[0] = {
            op: 'noteq',
            value: [setIdB],
            property: 'product_set',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(0);
    });

    it('is able to match using not equal', () => {
        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        const setIdB = 'e6ecd8e8-3cc8-11e6-ac61-9e71128cae77';
        sets[setIdB] = {
            id: setIdB,
            all_rules: [
                {
                    op: 'contains',
                    value: ['Bad'],
                    property: 'name',
                },
            ],
        };

        sets[rules[0].product_set].all_rules[0] = {
            op: 'noteq',
            value: [setIdB],
            property: 'product_set',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });
});
