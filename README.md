# CRUD PRODUCTS AND ORDERS
# Node.js REST API

This is a REST API built with Node.js, Express, and Sequelize. It performs CRUD operations on entities such as products and orders. You can view all orders and filter them by date and the products they contain.

## Technologies and Libraries Used

- Node.js
- Sequelize (with MySQL)
- Express
- Express-validator
- bcrypt
- dotenv
- http-status-codes
- typescript

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have Node.js, npm and MySQL installed on your machine.

### Installation

1. Clone the repo
```bash
   git clone <your-repo-url>
```

2. Install NPM packages
```bash
   npm install
```

3. Create a .env file in the root directory and add the following environment variables:
```bash
    DB_USER='root'
    DB_PASS='root'
    DB_NAME='agency'
    DB_HOST='localhost'
    DB_PORT=3306
    PORT=3000
```
Replace the values with your MySQL credentials and database details (the default port number for MySQL is 3306).

4. Run the script to create test data
```bash
    npm run "TASK create-test-data"
```

5. Start the server
```bash
    npm start
```
Now, you can start testing the API endpoints using a tool like Postman.

## API Endpoints

The API can be accessed at `http://localhost:{{PORT}}/api/`.
Please replace {{PORT}} with the actual port number your application is running on.

### Products

- `GET /products`: Fetch all products. Returns an array of products.
- `GET /products/:id`: Fetch a single product by its ID. Returns a product object.
- `POST /products`: Create a new product. Returns the created product object.
- `PUT /products/:id`: Update a product by its ID. Returns the updated product object.
- `DELETE /products/:id`: Delete a product by its ID. 

Each product response object is structured as follows:

```json
{
  "id"
  "name"
  "price"
  "description"
  "startDate"
  "endDate"
}
```
###  Orders

- `GET /orders`: Fetch all orders. Returns an array of orders. This endpoint can be filtered using query string parameters. 
  - `from`: If provided alone, it allows searching for orders based on the insertion date.
  - `to`: If provided in conjunction with `from`, it allows searching for orders within a specific date range.
  - `productsIds`: An array of product IDs. It allows searching for all orders that contain the products specified in the query parameters.
  Note: You cannot search by both date and products. You can only perform one type of filtered search at a time.
- `GET /orders/:id`: Fetch a single order by its ID. Returns an order object.
- `POST /orders`: Create a new order. Returns the created order object.
- `DELETE /orders/:id`: Delete an order by its ID.

- Each order response object is structured as follows:
```json
{
  "order": {
    "id"
    "userId"
    "createdAt"
    "updatedAt"
    "Products": [
      {
        "id"
        "name"
        "price"
        "description"
        "startDate"
        "endDate"
        "ProductOrder": {
          "product_quantity"
          "ProductId"
          "OrderId"
        }
      }
    ]
  }
}
```
Note: The PUT operation is not supported for orders, because orders cannot be updated but only deleted.

### License
Distributed under the MIT License. See LICENSE for more information.

### Contact
Emanuele Giovanni Bachetti - e.bachetti1997@gmail.com

Project Link: https://github.com/your_username/repo_name