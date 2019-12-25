# RESTful API

## Requirements

- The Entries are a ‘Categories’, ‘Products’ and ‘Users’.
- Categories can have multiple child categories.
- Child Categories can have further child categories
- Category can have multiple products and product can have multiple categories.
- Users will contain an Admin and Supervisors.
- Admin can add, update, view main categories, further child categories and Supervisors and also can view all the products.
- Supervisor can add, update, delete only child categories and products.
- The Entities are saved in MongoDB and are retrieved via HTTP methods respectively.

- This API provides
  1. User Authentication (with roles)
  2. Add a category
  3. Add products mapped to category or categories
  4. Get all the categories with its child categories mapped to it
  5. Get all the products by a category
  6. Update product details (name, price, etc.)

> Note: A Supervisor can’t add a category and an Admin can’t add a product.
