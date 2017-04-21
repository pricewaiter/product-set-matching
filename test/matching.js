const expect = require('chai').expect;
const { getProductMatches } = require('../src/');

describe('product set matching', () => {
    it('matches based on exact SKU', () => {
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
            value: ['NKE-RD-SHOE'],
            property: 'sku',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based exact on SKU exclusion', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'DOES-NOT-MATCH',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'noteq',
            value: ['NKE-RD-SHOE'],
            property: 'sku',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on partial SKU', () => {
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
            op: 'contains',
            value: ['NKE'],
            property: 'sku',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on partial SKU exclusion', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NIKE-RAD-SHOEZ',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'notcontains',
            value: ['NKE-RD'],
            property: 'sku',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on one of many SKUs', () => {
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

        delete sets[rules[0].product_set].all_rules;
        sets[rules[0].product_set].any_rules = [
            {
                op: 'contains',
                value: ['ADIDAS'],
                property: 'sku',
            },
            {
                op: 'contains',
                value: ['REEBOK'],
                property: 'sku',
            },
            {
                op: 'eq',
                value: ['NKE-RD-SHOE'],
                property: 'sku',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on brand', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'eq',
                value: ['Nike'],
                property: 'brand',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on exact params name', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'eq',
                value: ['Rad Shoe'],
                property: 'name',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on start of params name', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'startswith',
                value: ['Rad'],
                property: 'name',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on end of params name', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'endswith',
                value: ['Shoe'],
                property: 'name',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on exact price', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'eq',
                value: ['19.99'],
                property: 'price',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on price range', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'between',
                value: ['9.99', '29.99'],
                property: 'price',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on price minimum', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'above',
                value: ['9.99'],
                property: 'price',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches based on price maximum', () => {
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

        sets[rules[0].product_set].all_rules = [
            {
                op: 'below',
                value: ['29.99'],
                property: 'price',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('does not think a string is a regex', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: 'Nike',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'TRICKSYTRICKSY',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules = [
            {
                op: 'contains',
                value: ['$TRICKSY*'],
                property: 'sku',
            },
        ];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(0);
    });

    it('matches strings regardless of case', () => {
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
            op: 'contains',
            value: ['nke'],
            property: 'sku',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('treats null-ish values as blank string', () => {
        const { params, rules, sets } = require('./data/product_set_matching');

        params.products = [
            {
                brand: '',
                name: 'Rad Shoe',
                price_cents: 1999,
                sku: 'NKE-RD-SHOE',
                quantity: 2,
            },
        ];

        sets[rules[0].product_set].all_rules[0] = {
            op: 'eq',
            value: [null],
            property: 'brandn',
        };

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });

    it('matches when any_rules have been cleared out', () => {
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
            op: 'contains',
            value: ['nke'],
            property: 'sku',
        };
        sets[rules[0].product_set].any_rules = [];

        const result = getProductMatches(params, rules, sets);
        expect(result.length).to.equal(1);
    });
});
