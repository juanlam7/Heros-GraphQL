# Heros GraphQL API

## Overview
This is a GraphQL API built with Node.js and Express. It uses Mongoose for MongoDB data modeling, bcrypt for password hashing, and JWT for user authentication. The app follows a modular structure and supports TypeScript for type safety.

## Table of Contents
- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/heros-graphql.git
   cd heros-graphql
2. Install dependencies:
   ```bash
   npm install
3. Set Up Environment Variables: Create a .env file in the root directory (if you haven't done so) and define your environment variables as described in the [Environment Variables](#environment-variables) section.
   ```bash
    MONGO_DB_URI=mongodb://<username>:<password>@<host>:<port>/<database>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    NPM_CONFIG_PRODUCTION=false
    PORT=4000
    ENCRYPTION_SECRET=your_encryption_secret
4. Run the app:
   ```bash
   npm run dev
5. Access the API: Once the server is running, you can access the GraphQL API at:
   ```bash
    http://localhost:4000/api
## Scripts
The following npm scripts are available:

- **`npm run dev`**: Starts the app with `nodemon` for automatic server restarts upon file changes.
- **`npm run build`**: Compiles TypeScript files into JavaScript and outputs them to the `build` directory, after cleaning any existing files with `rimraf`.
- **`npm start`**: Builds the app and then starts the server using the compiled files in the `build` directory.
- **`npm run lint`**: Runs ESLint on the `src` folder to identify code issues.
- **`npm run lint:fix`**: Runs ESLint with the `--fix` option to automatically correct code style issues in the `src` folder.

## Environment Variables

The application relies on several environment variables for configuration. Create a `.env` file in the root directory and include the following variables:

- **`MONGO_DB_URI`**: Connection string for the MongoDB database.
- **`JWT_SECRET`**: Secret key used for signing JSON Web Tokens. Ensure this is a strong, unique value.
- **`NPM_CONFIG_PRODUCTION`**: Boolean for production mood.
- **`PORT`**:  Port on which the server will run (optional; defaults to 4000).
- **`ENCRYPTION_SECRET`**: Secret for field encryption in Mongoose.
