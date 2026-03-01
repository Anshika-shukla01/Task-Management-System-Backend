📌 Task Manager Backend
-----------------------------------------
-----------------------------------------

📝 Overview

This is the backend API for the Task Management System built using Node.js, Express, and SQLite.

It provides secure authentication using JWT (Access + Refresh Tokens) and supports full CRUD operations, searching, filtering, and protected routes.

The backend follows a RESTful API architecture and is designed to work with the Next.js frontend.
--------------------------------------------
🚀 Tech Stack

Node.js

Express.js

SQLite

JWT (Access & Refresh Tokens)

bcrypt

dotenv

CORS
-------------------------------------------------------
🗄 Database

Uses SQLite as the database.

Lightweight file-based relational database.

No external database server required.

Data is stored in a local .db file.

Tables include:

users

tasks
------------------------------------------------------------
🔐 Authentication System

Implements secure token-based authentication:

✔ Access Token

Short-lived

Used to access protected routes

Sent in request headers

✔ Refresh Token

Long-lived

Used to generate new access tokens

Helps maintain user session

This ensures secure and persistent login functionality.
------------------------------------------------------------
✨ Features
👤 User Authentication

Register

Login

Password hashing using bcrypt

JWT authentication

Refresh token support

Logout
-------------------------------------------------------------
📋 Task Management (CRUD)

Create Task

Read Tasks

Update Task

Delete Task

Toggle Task Status
-----------------------------------------------------------------
🔎 Additional Features

Search tasks

Filter tasks by status

Protected routes using middleware

Input validation

Error handling

Rate limiting

Unique email constraint
--------------------------------------------------------
📡 API Endpoints
🔐 Authentication Routes
Register
POST /api/auth/register
Login
POST /api/auth/login
Logout
POST /api/auth/logout
Refresh Token
POST /api/auth/refresh
📋 Task Routes (Protected)
---------------------------------------------------------
⚠ Requires Access Token in headers.

Get All Tasks
GET /api/tasks
Create Task
POST /api/tasks
Update Task
PUT /api/tasks/:id
Delete Task
DELETE /api/tasks/:id
Toggle Task Status
PATCH /api/tasks/:id/toggle
Search & Filter
GET /api/tasks?search=keyword&status=completed
⚙ Environment Variables
----------------------------------------------------------
Create a .env file:

PORT=5000
JWT_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
DATABASE_PATH=./database.sqlite
-----------------------------------------------------------
🏃‍♂️ How to Run Locally
1️⃣ Install Dependencies
npm install
-----------------------------------------
2️⃣ Create .env File

Add required environment variables.
------------------------------------------
3️⃣ Start Development Server
npx ts-node-dev src/server.ts

Server will run at:

http://localhost:5000
-----------------------------------------------
🛡 Security Features

Password hashing (bcrypt)

JWT authentication

Access & Refresh token system

Protected middleware

Rate limiting

CORS enabled

Environment variables for secrets

Unique email constraint
-----------------------------------------
📁 Project Structure
task-manager-backend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── database.sqlite
├── server.js
└── .env
---------------------------------------------
🎯 Project Status

✔ Authentication Working
✔ SQLite Database Integrated
✔ Full CRUD Implemented
✔ Search & Filtering Working
✔ Secure Token System
✔ Ready for Production