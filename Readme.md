# Project Documentation

## Tech Stack
**Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary, dotenv, cors, cookie-parser, Postman**

---

## Backend Architecture & Features

- Built a RESTful API using Node.js and Express.js with a modular architecture.
- Implemented MongoDB with Mongoose for schema-based data modeling.
- Used JWT for authentication and authorization.
- Secured user passwords using bcrypt hashing.
- Managed environment variables using dotenv.
- Enabled cross-origin requests using CORS middleware.
- Parsed cookies using cookie-parser for session handling.
- Implemented file upload functionality using Multer (disk and memory storage).
- Integrated Cloudinary for cloud-based media storage and management.

---

## File Handling System

- Uploaded files using Multer before transferring them to Cloudinary.
- Stored file metadata and binary data in MongoDB using Buffer.
- Implemented secure file download with proper headers (`Content-Disposition`, `Content-Type`).
- Used streaming for efficient file transfer between server and client.

---

## Database Design

- Used MongoDB collections for flexible data modeling where required.
- Implemented aggregation pipelines for advanced querying.
- Used `mongoose-aggregate-paginate-v2` for pagination in aggregation queries.

---

## Authentication & Security

- Implemented JWT-based authentication system using access tokens.
- Secured protected routes using authentication middleware.
- Stored JWT tokens in HTTP-only cookies for security.
- Managed token expiration independently from cookie expiration.

---

## API & Development Tools

- Tested and documented APIs using Postman.
- Used nodemon for automatic server restarts during development.
- Followed RESTful API design principles.

---

## Key Concepts Implemented

- Middleware-based architecture in Express.js
- Higher-order functions for reusable controllers
- Event-driven architecture using `app.emit` and `app.on`
- Stream-based file handling in Node.js
- Centralized error handling with custom middleware

---

## Notes

- Environment variables are always parsed as strings.
- File uploads require Multer middleware to populate `req.file` or `req.body`.
- Aggregation pipelines must be executed before pagination.
- JWT expiration and cookie expiration are handled separately.