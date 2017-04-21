const expect = require('chai').expect;
const { getProductMatches } = require('../src/');

describe('product set matching', () => {
    it('normalizes spaces in rules', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad   Shoe  Store',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: ['Rad Shoe Store'],
            property: 'name',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('normalizes trailing spaces in rules', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe ',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: ['Rad Shoe'],
            property: 'name',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });
    it('normalizes spaces in products', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: ['Rad  Shoe'],
            property: 'name',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('normalizes trailing spaces in products', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: [' Rad Shoe '],
            property: 'name',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('normalizes spaces in both', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: ' Rad   Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: ['Rad  Shoe '],
            property: 'name',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });
});
