# Product Set Matching Logic

Logic function to apply complex product set rules to a set of product data.

## Product Data Schema

Example:

```javascript
const params = {
    products: [
        {
            brand: 'Nike',
            name: 'Rad Shoe',
            price_cents: 1999,
            sku: 'NKE-RD-SHOE',
            quantity: 2
        }
    ]
};
```

## Product Set Discount Rules

``` 
const rules = [
    {
        version: 1,
        store_id: 'SETMATCHING',
        sort_index: 1,
        product_set: '71e33676-beb9-4cd7-8aa2-6fcb858d795d',
        quantity_ranges:
        [
            {
                min: 1,
                max: 10,
                action: 'exact_discount',
                value: 10,
                value_type: 'percentage',
            },
            {
                min: 11,
                action: 'manual',
            },
        ],
        enabled: true,
        id: 'a30abf14-e4d8-4ef7-a1e1-bc636f3cb3ea',
        created_at: '2016-05-13T23:01:37.486Z',
    },
];
```

## Product Sets

```javascript
const sets = {
    '71e33676-beb9-4cd7-8aa2-6fcb858d795d': {
        id: '71e33676-beb9-4cd7-8aa2-6fcb858d795d',
        updated_at: '2016-04-18T21:49:54.807Z',
        all_rules: [
            {
                op: 'contains',
                value: ['NIKE-RD-SHOE'],
                property: 'sku',
            },
        ],
        previous_version: 1,
        name: 'nike shoe',
        created_at: '2016-04-18T21:49:54.778Z',
        store_id: 'SETMATCHING',
        version: 2,
    },
};
```

## Matches

```const result = getProductMatches(params, rules, sets);```

Result will contain the discount rules that are allowed to be used on this particular product.
