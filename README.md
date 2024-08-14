# Banking System API

## Description

The Banking System API is a backend service built with Node.js, TypeScript, and PostgreSQL, designed to manage user accounts, transactions, and authentication. The API allows users to register, log in, create accounts, perform transactions, and transfer funds between accounts.

## Features

- **User Registration and Login:** Secure user registration and login with JWT-based authentication.
- **Account Management:** Create and manage various types of accounts including savings, current, fixed, and domiciliary.
- **Transaction Handling:** Create, view, and manage transactions. Supports debit, credit, and transfers between accounts.
- **Secure Authentication:** JWT-based authentication to ensure secure access to endpoints.
- **Notification on Authentication:** Sends a notification email to users upon successful authentication, confirming their login and providing support contact information.

## Project Structure

- **`src/`**: Contains the source code for the project.
  - **`config/`**: Includes onfiguration file for database connection.
     - `db.ts`: Sets up and connects to the PostgreSQL database using Sequelize.
  - **`controllers/`**: Includes the logic for handling requests and interacting with the database.
    - `accountController.ts`: Manages account creation and retrieval.
    - `authController.ts`: Handles user authentication and registration.
    - `transactionController.ts`: Manages transactions and transfers.
  - **`middleware/`**: Contains middleware functions for request processing.
    - `authMiddleware.ts`:  Authenticates JWT tokens to protect routes.
  - **`models/`**: Defines the Sequelize models for User, Account, and Transaction.
  - **`routes/`**: Defines the API routes for different resources.
    - `authRoute.ts`: Routes for authentication and user management.
    - `accountRoutes.ts`: Routes for account management.
    - `transactionRoutes.ts`: Routes for transaction management.
  - **`utils/`**: Contains utility functions, including validation functions.
    - `validation.ts`: Provides utility functions for input validation.
    - `emailNotifUtils.ts`: Provides utility functions for sending email notification upon successful authentication.
  - **`app.ts`**: Main application file that sets up middleware and routes.
- **`dist/`**: (Generated) Compiled and build artifacts. **Not included in version control.**
- **`.env`**: Environment variables configuration file. **Not included in version control.**
- **`.gitignore`**: File to specify which files and directories to ignore in version control.
- **`package.json`**: Contains project metadata and dependencies.
- **`README.md`**: Project documentation and setup instructions.
- **`tsconfig.json`**: TypeScript configuration file.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sorphy/banking-system.git
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
   BREVO_USER=your_brevo_smtp_user
   BREVO_PASSWORD=your_brevo_smtp_password

   ```

2. Configure your Brevo SMTP settings:
   - **`BREVO_USER`**: Your Brevo SMTP username (email address).
   - **`BREVO_PASSWORD`**: Your Brevo SMTP password.
  
     
## Running the Project

1. **Compile TypeScript files:**

   ```bash
   yarn compile
   ```
2. **Start the application in development mode:**

   ```bash
   yarn dev
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
Use Postman or any API client to test the endpoints. Make sure to include the JWT token in the Authorization header as a `Bearer token` for endpoints requiring authentication.

## How to Test the API

### Postman Collection
To test the API, import the provided Postman collection into Postman. 
You can find the Postman collection for testing the API in the [Postman Collection](https://github.com/Sorphy/banking-system/blob/main/Banking%20System%20API.postman_collection.json)

1. **Import Postman Collection**
   - Open Postman.
   - Click on the "Import" button.
   - Choose the file `BankingSystemCollection.postman_collection.json` from the root of this repository.
   - Click "Import" to load the collection.

2. **Using the Collection**
   - You will find a collection named "Banking System API" in Postman.
   - Expand the collection to see all available requests.
   - Each request has a description explaining its purpose and usage.


## License
This project is licensed under the MIT License.


## Acknowledgments
- Sequelize for ORM
- bcryptjs for password hashing
- jsonwebtoken for JWT authentication
- PostgreSQL for the database
- Brevo for email notifications
