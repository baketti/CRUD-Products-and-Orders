# Node.js REST API
# Authentication and authorization simple demo

## Final exam for Start2Impact University Node.js course

This is a REST API built with Node.js, Express, and Sequelize. It performs CRUD operations on entities such as products and orders. You can view all orders and filter them by date and the products they contain. The API includes also basic authentication and authorization for admin users only, with JWT asymmetric encryption using a public and a private key. The keys are included in the repository for ease of testing, though it's advised that, in production, the private key must be kept secure and, surely, not exposed. Note that this implementation is basic and for demo purposes only.

## Technologies and Libraries Used

- Node.js
- Sequelize (with MySQL)
- Express
- Express-validator
- bcrypt
- dotenv
- http-status-codes
- Typescript
- Postman

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have Node.js, npm and MySQL installed on your machine.

### Installation

1. Clone the repo
```bash
   git clone https://github.com/baketti/CRUD-Products-and-Orders
```

2. Install NPM packages
```bash
   npm install
```
3. Create your local MySQL database.

4. Create a .env file in the root directory and add the following environment variables:
```bash
    DB_USER=
    DB_PASS=
    DB_NAME=
    DB_HOST=
    DB_PORT=
    API_PORT=
```
Replace the values with your MySQL credentials and database details (the default port number for MySQL is 3306).

5. Run the script to create test data
```bash
    npm run "TASK create-test-data"
```

This command will create tables populated with some data(products,users and some orders) to start testing the API.

6. Start the server in development mode:
```bash
    npm run dev
```

- Now, you can start testing the API endpoints using Postman or any other tool you like.
- The first step is, for sure, to authenticate using an existing user or admin account to proceed with   requests, or register using custom credentials.
- If you choose an existing one, you can find its credentials into the users folder within /tasks/data. 

Below, you can see all the available routes.

## API Endpoints

The API can be accessed at `http://localhost:{{PORT}}/api`.
Please replace {{PORT}} with the port number you want your application will run on.

### Authentication

- `POST /login`: Login a user. Returns a JWT token if it's an admin.
Request body:
```json
{
  "email"
  "password"
}
```
- `GET /logout`: Logout a user. 

### Products

Regular users:

- `GET /products`: Fetch all products. Returns an array of products.
- `GET /products/:id`: Fetch a single product by its ID. Returns a product object.

Admin users (include JWT in the Authorization header with the auth type Bearer Token):

- `POST /admin/products`: Create a new product. Returns the created product object.
Request body must include the following fields (description is optional):
```json
{
  "name"
  "price"
  "startDate"
  "endDate"
}
```
- `PUT /admin/products/:id`: Update a product by its ID. Returns the updated product object.
- `DELETE /admin/products/:id`: Delete a product by its ID.

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
Note: Admins can do everything they want with products, but users can only watch!

###  Orders

Regular users:

- `POST /orders`: Create a new order. Returns the created order object.
Request body must include the following fields: 
```json
{
  "productsIds":[]
}
```
- `GET /orders/me`: Fetch all orders of the logged-in user. Returns an array of order objects.

Admin users (include JWT in the Authorization header with the auth type Bearer Token):

- `GET /admin/orders`: Fetch all orders. Returns an array of orders. This endpoint can perform filtered search using query string parameters. 
  - `from`: If provided alone, it allows searching for orders based on the insertion date: orders with a createdAt field matching the 'from' date will be returned.
  - `to`: It doesn't work alone. If provided in conjunction with `from`, it allows searching for orders within a specific date range.
  - `productsIds`: If provided it will be an array of product IDs(one or more). It allows searching for all orders that contain the products specified in the query parameters.

  Note: You cannot search by both date and products. You can only perform one kind of filtered search at a time.
  
- `GET admin/orders/:id`: Fetch a single order by its ID. Returns an order object.
- `DELETE admin/orders/:id`: Delete an order by its ID.

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
Note: Admins cannot make orders, only users can do!

### Users

Regular users:
- `POST /users/register`: Register a new user. Returns the registered user object.
Request body must include the following fields:

```json
{
  "name"
  "surname"
  "email"
  "password"
  "role"
}
```
- `GET /users/me`: Fetch the logged-in user's details. Returns a user object.
- `PUT /users/me`: Update the logged-in user's details. Returns the updated user object.

Admin users (include JWT in the Authorization header with the auth type Bearer Token):

- `GET /admin/users`: Fetch all users. Returns an array of user objects.
- `GET /admin/users/:id`: Fetch a single user by its ID. Returns a user object.
- `PUT /admin/users/:id`: Update a user by its ID. Returns the updated user object.
- `DELETE /admin/users/:id`: Delete a user by its ID. Returns a confirmation message.

Note: Admins cannot create users but they can handle everything of them. Only users can register themselves!

### Contact
Emanuele Giovanni Bachetti - e.bachetti1997@gmail.com
