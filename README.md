# Tutorial

This project provides a boilerplate setup for building RESTful APIs using **Node.js**, **Express**, and **Prisma** with **TypeScript**. It includes a set of common libraries and configurations to jumpstart your development process, with added focus on security, performance, and code quality.

## Features

- **Express.js**: Lightweight framework for building APIs.
- **Prisma**: ORM for database management and migrations.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Zod**: Validation of environment variables and request data.
- **JWT Authentication**: Authentication via JSON Web Tokens.
- **Rate Limiting**: Prevent brute-force attacks on authentication endpoints.
- **Logging**: Detailed request and error logs using **morgan** and **winston**.
- **Security Headers**: Secure HTTP headers with **helmet**.
- **CORS**: Cross-Origin Resource Sharing configured with **cors**.
- **Compression**: Gzip compression for improved performance.
- **Linting & Formatting**: Code linting with **ESLint** and formatting with **Prettier**.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dattv233/cms-add-BE.git
   cd cms-add-BE
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a .env file to configure your environment variables:

   ```bash
   cp .env.example .env
   ```

4. **Run the development server**: Start the server in development mode:

   ```bash
    npm run dev
   ```

5. **Run database migrations (optional)**: If you need to set up your database schema, run:
   ```bash
    npm run db:migrate --name <migration-name>
   ```

## Project Structure

The project has the following structure:

    ```bash
      src
      ├───configs          # Configuration files (e.g., database, passport)
      ├───controllers      # Route handler functions
      ├───middlewares      # Custom middleware (e.g., error handling, rate limiting)
      ├───routes
      │   └───v1           # API version 1 routes
      ├───services         # Business logic (e.g., authentication, database interactions)
      ├───types            # TypeScript type definitions
      ├───utils            # Utility functions (e.g., error handling, helper functions)
      └───validations      # Validation schemas for request data
    ```

## Middleware Used

This project utilizes several middleware components to enhance security, manage requests, and handle errors effectively. The following middleware are included:

- **CORS (cors)**: Enables Cross-Origin Resource Sharing, allowing the server to specify which origins are permitted to access resources. This is essential for handling requests from different domains.

- **Helmet**: A security middleware that sets various HTTP headers to help protect the application from common vulnerabilities like cross-site scripting (XSS), clickjacking, and other attacks.

- **Express Rate Limit (express-rate-limit)**: A middleware to limit repeated requests to public APIs and/or endpoints, preventing abuse and denial-of-service attacks.

- **Compression**: This middleware compresses response bodies to reduce the size of the data being sent over the network, improving performance for clients.

- **XSS Protection (xss)**: A middleware to sanitize user input and protect against Cross-Site Scripting (XSS) attacks by escaping potentially dangerous characters.

- **Passport**: Middleware for authenticating requests. This project uses the JWT strategy for secure user authentication.

- **Error Handling Middleware**: Custom error handling middleware to catch and respond to errors gracefully, converting standard errors into a consistent API error format.
