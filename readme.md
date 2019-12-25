# DB Schema

## Category

```json
    [
        {
            "_id": "car_id",
            "name": "car",
            "root":true,
            "child":[{
                "_id":"",
                "name":"subcat1_id",
                "child":[]
            },
            {
                "_id":"",
                "name":"subcat2_id",
                "child":[]
            }]
        }
    ]
```

## Product

```json
    [
        {
            "_id": "wiper_id",
            "cat_id": ["null"],
            "name":"wiper"
        },
        {
            "_id": "tubes_id",
            "cat_id": ["wheel_id",""],
            "name":"tubes"
        },
        {
            "_id": "tire_id",
            "cat_id": ["wheel_id"],
            "name": "tire cleaner"
        },
        {
            "_id": "leather_id",
            "cat_id": ["seat_id"],
            "name": "leather cleaner"
        },
        {
            "_id": "vaccum_id",
            "cat_id": ["wheel_id"],
            "name": "vaccum"
        }
    ]
```
