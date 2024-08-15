# be-studycase

This repository contains a backend study case, implemented as part of my learning journey in backend development. The project demonstrates basic CRUD operations and RESTful API creation using Node.js without any framework.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Schema Validation](#schema-validation)
- [Error Handling](#error-handling)

## Introduction

This project serves as a simple backend service that manages user data, including their  name, email, and date of birth. The goal is to create a RESTful API that allows clients to create, read, update, and delete user records. The application uses Node.js and JSON schema validation with [AJV](https://ajv.js.org/) to ensure data integrity.

## Technologies Used

- Node.js
- AJV (Another JSON Validator) for schema validation
- HTTP module (built-in Node.js module)

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hanifsetyadi/be-studycase.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd be-studycase
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Run the server:**
   ```bash
   npm run start
   ```

   The server will start running on `http://localhost:8000`.

## Usage

Once the server is running, you can interact with the API using tools like `Postman`, `curl`, or any other API client.

## API Endpoints

### 1. Create a User

- **URL:** `/users`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "dateofbirth": "1990-01-01"
  }
  ```
- **Response:**
  - **201 Created:** User created successfully
  - **400 Bad Request:** Validation failed

### 2. Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Response:**
  - **200 OK:** List of all users

### 3. Get a User by ID

- **URL:** `/users/{id}`
- **Method:** `GET`
- **Response:**
  - **200 OK:** User found
  - **404 Not Found:** User not found

### 4. Update a User

- **URL:** `/users/{id}`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "dateofbirth": "1990-01-01"
  }
  ```
- **Response:**
  - **200 OK:** User updated successfully
  - **400 Bad Request:** Validation failed
  - **404 Not Found:** User not found

### 5. Delete a User

- **URL:** `/users/{id}`
- **Method:** `DELETE`
- **Response:**
  - **200 OK:** User deleted successfully
  - **404 Not Found:** User not found

## Schema Validation

The project uses [AJV](https://ajv.js.org/) to validate the user data against the following schema:

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "dateofbirth": { "type": "string", "format": "date" }
  },
  "required": ["name", "email", "dateofbirth"],
  "additionalProperties": false
}
```

## Error Handling

The API provides appropriate HTTP status codes and error messages for various error scenarios, such as validation failures, missing resources, or invalid requests.