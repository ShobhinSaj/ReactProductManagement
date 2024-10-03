# Product Management Interface

A React+Typescript based product management interface that allows users to manage their products. This application includes user authentication and authorization, ensuring that each user can only access and manage their own products.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)


## Features

- User authentication and authorization
- Create/Delete/Read operations for products
- User-specific product lists
- Error handling with user-friendly messages
- Responsive design

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ShobhinSaj/ReactProductManagement.git
   cd product-management-interface
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## Usage

### Running the Backend

- Navigate to the backend directory:
  ```sh
  cd backend
  ```
- Start the backend server:
  ```sh
  npm run dev
  ```

### Building the Frontend

To build the app for production, run:
```sh
npm run build
```
This will create an optimized production build in the `build` folder.

## API Endpoints

### Authentication

- **POST /api/login**: Authenticate a user and return a JWT token.
- **POST /api/signup**: Create a new user account.

### Products

- **GET /api/products**: Get all products for the authenticated user.
- **POST /api/products**: Create a new product for the authenticated user.
- **DELETE /api/products/:id**: Delete a product by ID for the authenticated user.

## Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```
ACCESS_TOKEN_SECRET=youraccesstokensecret
```
