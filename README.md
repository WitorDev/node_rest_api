# Product API (Express + EJS)

A simple Product CRUD API built with Node.js, Express, and Server-Side Rendering (SSR) via EJS. Data is managed in-memory.

## 🚀 Technologies

- Node.js
- Express
- EJS
- Method-Override
- Dotenv

## 🛠️ How to Run

```bash
npm install
```

```
PORT=3000
```

```bash
node server.js
```

Open http://localhost:3000

## 📦 Data Structure

```json
{
  "id": 1,
  "name": "Product Name",
  "price": 10.5
}
```

## 🔌 API Endpoints

### Get all products

GET /api/products

### Search products

GET /api/products/search?q=term

### Get product by ID

GET /api/product/:id

### Create product

POST /api/product
{
"name": "Mouse",
"price": 50
}

### Update product (full)

PUT /api/product/:id
{
"name": "New Name",
"price": 100
}

### Update product (partial)

PATCH /api/product/:id
{
"name": "Only Name"
}

### Delete product

DELETE /api/product/:id

## 🌐 Web (SSR) Routes

GET /
GET /products
GET /product/:id
POST /product
PUT /product/:id
PATCH /product/:id
DELETE /product/:id

## ✅ Validations

- Name: required
- Price: number > 0
- ID must exist

## ⚠️ Notes

- In-memory storage
- ID based on array length
- Method override required for forms
- SSR with EJS
