# Entities

- Categories
  - Household
  - Car
  - Gifts
- Products
  - Wiper
  - Camera
  - Mobile
  - washer
- Users
  - Admin
  - Supervisor

## DB Schema

```json
    [
        {
            "_id": "car_id",
            "ref_id": "null",
            "category": "car",
            "products": [
            "wiper"
            ]
        },
        {
            "_id": "wheel_id",
            "ref_id": "car_id",
            "category": "wheel",
            "products": [
            "tubes",
            "tire cleaner"
            ]
        },
        {
            "_id": "seat_id",
            "ref_id": "car_id",
            "category": "seat",
            "products": [
            "vaccum",
            "leather cleaner"
            ]
        }
    ]
```