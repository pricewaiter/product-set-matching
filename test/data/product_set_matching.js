module.exports = {
    params: {
        id: '123423',
        buyer: '1234',
        campaign: 'neg-abcdefghi',
        created_at: '2016-04-06T18:50:33.395Z',
        fraud_score: 0.1,
        ip: '1.2.3.4',
        subtotal_cents: 3000,
        products:
        [
            {
                brand: 'Null',
                name: 'No match',
                price_cents: 19999999,
                sku: 'NO-MATCH-SKU',
                quantity: 37,
            },
        ],
        state: 'new',
        store_id: 'SETMATCHING',
    },
    rules: [
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
    ],
    sets: {
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
    },
};
