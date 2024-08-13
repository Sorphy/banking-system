# Banking System API

## Description

The Banking System API is a backend service built with Node.js, TypeScript, and PostgreSQL, designed to manage user accounts, transactions, and authentication. The API allows users to register, log in, create accounts, perform transactions, and transfer funds between accounts.

## Features

- **User Registration and Login:** Secure user registration and login with JWT-based authentication.
- **Account Management:** Create and manage various types of accounts including savings, current, fixed, and domiciliary.
- **Transaction Handling:** Create, view, and manage transactions. Supports debit, credit, and transfers between accounts.
- **Secure Authentication:** JWT-based authentication to ensure secure access to endpoints.

## Project Structure

- **`src/`**: Contains the source code for the project.
  - **`controllers/`**: Includes the logic for handling requests and interacting with the database.
    - `authController.ts`: Handles user authentication and registration.
    - `accountController.ts`: Manages account creation and retrieval.
    - `transactionController.ts`: Manages transactions and transfers.
  - **`models/`**: Defines the Sequelize models for User, Account, and Transaction.
  - **`routes/`**: Defines the API routes for different resources.
    - `authRoute.ts`: Routes for authentication and user management.
    - `accountRoutes.ts`: Routes for account management.
    - `transactionRoutes.ts`: Routes for transaction management.
  - **`utils/`**: Contains utility functions, including validation functions.
    - `validation.ts`: Provides utility functions for input validation.
  - **`config/`**: Configuration files for database connection and environment variables.
  - **`app.ts`**: Main application file that sets up middleware and routes.

- **`dist/`**: Contains the compiled JavaScript files.
- **`.env`**: Environment variables configuration file.
- **`package.json`**: Contains project metadata and dependencies.
- **`tsconfig.json`**: TypeScript configuration file.

## Installation

1. **Clone the repository:**

   ```bash
   git clone 
   ```
2. **Navigate to the project directory:**

   ```bash
   cd banking-system
   ```
2. **Install dependencies:**

   ```bash
   yarn install
   ```

## Configuration
1. Create a .env file in the root directory and add the following environment variables:

   ```bash
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   JWT_SECRET=some_jwt_secret
   DB_PORT=your_db_port
   ```

## Running the Project

1. **Compile TypeScript files:**

   ```bash
   yarn compile
   ```
2. **Start the application in development mode:**

   ```bash
   yarn dev
   ```
2. **Start the application in production mode:**

   ```bash
   yarn start
   ```

## API Endpoints

- **Authentication**
   
  - **POST /auth/register**: Register a new user.
    
  - **POST /auth/login**: Log in an existing user.
    
  - **GET /auth/me**: Get the current user's details.
    
- **Accounts**
   
  - **POST /accounts**: Create a new account.
    
  - **GET /accounts/:id**: Get account details.
    
- **Transactions**
   
  - **POST /transactions**: Create a new transaction.
    
  - **GET /transactions**: List all transactions for the current user.
    
  - **POST /transactions/transfer**: Transfer funds between accounts.


## Testing
Use Postman or any API client to test the endpoints. Make sure to include the JWT token in the Authorization header as a Bearer token for endpoints requiring authentication.


## License
This project is licensed under the MIT License.


## Acknowledgments
- Sequelize for ORM
- bcryptjs for password hashing
- jsonwebtoken for JWT authentication
- PostgreSQL for the database
