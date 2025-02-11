# E-Commerce Application

## Introduction

The **E-Commerce Application** is a full-stack web application that allows users to browse, purchase, and manage products online. The application includes authentication, a shopping cart, order management.

## Project Type

Fullstack

## Deployed App

- **Frontend:** [Frontend Deployment Link](https://edgistify-assignmenty.netlify.app/)
- **Backend:** [Backend Deployment Link](https://edgistify-backend-m67w.onrender.com)

## Directory Structure

```
ecommerce-app/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
│  ├─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ redux/
│  │  ├─ routes/
│  │  ├─ App.tsx
│  │  ├─ index.tsx
```

## Features

- User Authentication (Signup/Login)
- Product Listings
- Shopping Cart and Checkout Process
- Order Management
- JWT Authentication for Secure Access

## Design Decisions or Assumptions

- Users can browse products without authentication but must log in to purchase.
- MongoDB is used as the primary database.
- JWT is used for secure authentication.
- Redux is used for state management.
- ChakraUI is used for styling.

## Installation & Getting Started

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/harshshukla2002/Edgistify-Assignment

# Backend Setup
cd backend
npm install
npm start

# Frontend Setup
cd frontend
npm install
npm start
```

## Usage

Once the application is running, users can browse products, add them to the cart, proceed to checkout, and place orders securely.

```bash
# Example: Add Product to Cart
POST /api/product/addtocart
Headers: { "Authorization": "Bearer token" }
Body: { "productId": "67ab080267f903dd8e5a4d2b", "quantity": 1 }
```

## Credentials

Use the following credentials for testing:

```bash
Email: test@example.com
Password: password123
```

## APIs Used

- **Backend API**: Custom-built REST API

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Authenticate user

### Products

- **GET /api/products** - Get all products
- **POST /api/products/addtocart** - Add item to cart
- **GET /api/products/cart** - View cart items cart
- **POST /api/products/placeorder** - Place an order
- **GET /api/products/orders** - Get user orders

## Technology Stack

- **Frontend:** React, TypeScript, ChakraUI, Redux
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication
- **Database:** MongoDB
- **State Management:** Redux
