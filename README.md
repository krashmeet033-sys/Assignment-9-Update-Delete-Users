# Express.js + MongoDB + Mongoose — Update and Delete Users

A backend application built using **Node.js, Express.js, MongoDB, and Mongoose** that performs user update and delete operations through REST APIs.

This project extends the user management application created in Question 1 and focuses on updating and deleting existing MongoDB documents using their unique document IDs.

---

## 👩‍💻 Student Details

| Details | Information |
|---|---|
| **Student Name** | Rashmeet Kaur |
| **Roll Number** | 150096725165 |
| **Course** | B.Tech Computer Science & Engineering |
| **Year** | Second Year |
| **Assignment** | Question 2 — Update and Delete Users |
| **Database** | MongoDB |
| **Server Port** | 5500 |

---

# 📌 Introduction

This project extends the Express.js and MongoDB user management application developed in Question 1.

The application uses **Express.js** for creating REST APIs, **MongoDB** for storing user information, and **Mongoose** for interacting with MongoDB.

The main focus of this assignment is to implement:- 

- Updating an existing user using `PATCH`
- Deleting an existing user using `DELETE`
- Using MongoDB document IDs
- Validating MongoDB IDs
- Handling users that do not exist
- Handling database and validation errors
- Maintaining a proper separation between schema, model, router, and server files

The project follows the required folder structure and keeps database and routing logic separate from `server.js`.

---

# 🎯 Objectives

The objectives of this assignment are:-

- Connect an Express.js application to MongoDB using Mongoose.
- Reuse the existing Mongoose schema and model.
- Implement a PATCH API for updating existing users.
- Implement a DELETE API for deleting existing users.
- Read MongoDB document IDs using `req.params`.
- Read updated information using `req.body`.
- Use Mongoose methods for database operations.
- Handle invalid IDs and missing users.
- Return appropriate HTTP status codes.
- Maintain a clean and organized backend structure.

---

# 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Thunder Client**
- **Visual Studio Code**
- **JavaScript**

---

# 📁 Project Folder Structure

```text
Assignment 9/
│
├── model/
│   └── userModel.js
│
├── router/
│   └── userRouter.js
│
├── schema/
│   └── userSchema.js
│
├── server.js
├── package.json
└── package-lock.json
```

### File Description

| File / Folder | Purpose |
|---|---|
| `server.js` | Starts the Express server and connects to MongoDB |
| `schema/userSchema.js` | Defines the Mongoose user schema |
| `model/userModel.js` | Creates the Mongoose User model |
| `router/userRouter.js` | Contains POST, GET, PATCH and DELETE routes |
| `package.json` | Contains project dependencies and configuration |

The schema, model, and router logic are kept outside `server.js` as required.

---

# 🍃 MongoDB Configuration

The application uses MongoDB as the database.

### Database Name

```text
userdb
```

### MongoDB Connection

```text
mongodb://127.0.0.1:27017/userdb
```

The connection is established using Mongoose.

When the connection is successful, the terminal displays:

```text
MongoDB connected successfully
```

---

# 🧩 User Schema

The user schema is defined in:

```text
schema/userSchema.js
```

The schema contains the following fields:- 

| Field | Data Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name of the user |
| `email` | String | Yes | Email address of the user |
| `age` | Number | Yes | Age of the user |
| `course` | String | Yes | Course enrolled by the user |
| `createdAt` | Date | Automatically generated | Record creation time |
| `updatedAt` | Date | Automatically generated | Record update time |

The schema uses Mongoose timestamps to automatically maintain `createdAt` and `updatedAt`.

---

# 🧠 Mongoose Model

The Mongoose model is defined in:

```text
model/userModel.js
```

The model is created using the user schema:

```javascript
const User = mongoose.model("User", userSchema);
```

The `User` model is then imported into the router and used for database operations.

---

# 🚀 API Endpoints

The application exposes the following user APIs:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/users` | Create a user |
| `GET` | `/api/users` | Retrieve users |
| `PATCH` | `/api/users/:id` | Update an existing user |
| `DELETE` | `/api/users/:id` | Delete an existing user |

The main focus of Question 2 is the **PATCH** and **DELETE** operations.

---

# ✏️ 1. Update User — PATCH

The PATCH API is used to update an existing user's information.

### Endpoint

```http
PATCH http://localhost:5500/api/users/:id
```

The `:id` represents the MongoDB document ID of the user.

### Example

```http
PATCH http://localhost:5500/api/users/68abc123456789abcdef1234
```

> The ID shown above is only an example. The actual MongoDB `_id` generated in the database should be used.

---

## Request Body

The updated fields are sent in JSON format.

```json
{
  "age": 23,
  "course": "MCA"
}
```

Only the fields that need to be changed are provided.

---

## How PATCH Works

The API:

1. Reads the MongoDB ID from `req.params`.
2. Validates the MongoDB ID.
3. Reads updated information from `req.body`.
4. Finds the corresponding user.
5. Updates the user in MongoDB.
6. Returns a successful response.

The Mongoose method used is:

```javascript
User.findByIdAndUpdate()
```

The update uses:

```javascript
{
  new: true,
  runValidators: true
}
```

This ensures that the updated document is returned and schema validation is applied.

---

## Successful PATCH Response

```text
User updated successfully
```

HTTP Status:

```text
200 OK
```

---

# 🗑️ 2. Delete User — DELETE

The DELETE API is used to remove an existing user from MongoDB.

### Endpoint

```http
DELETE http://localhost:5500/api/users/:id
```

### Example

```http
DELETE http://localhost:5500/api/users/68abc123456789abcdef1234
```

> The ID shown above is only an example. The actual MongoDB `_id` should be used.

---

## Request Body

The DELETE request does not require a request body.

The user is identified using the MongoDB document ID in the URL.

---

## How DELETE Works

The API:

1. Reads the user ID from `req.params`.
2. Validates the MongoDB ID.
3. Finds the corresponding user.
4. Deletes the user from MongoDB.
5. Returns a successful response.

The Mongoose method used is:

```javascript
User.findByIdAndDelete()
```

---

## Successful DELETE Response

```text
User deleted successfully
```

HTTP Status:

```text
200 OK
```

---

# ⚠️ Error Handling

The application handles common API and database errors.

### 1. Invalid MongoDB ID

If an invalid ID is provided:

```text
400 Bad Request
```

Response:

```json
{
  "message": "Invalid user ID"
}
```

---

### 2. User Not Found

If the ID is valid but no matching user exists:

```text
404 Not Found
```

Response:

```json
{
  "message": "User not found"
}
```

---

### 3. Database Error

If an unexpected database error occurs:

```text
500 Internal Server Error
```

Response:

```json
{
  "message": "Database error",
  "error": "..."
}
```

---

### 4. Invalid Request Data

Invalid data supplied while creating or updating users is handled through validation.

The application uses Mongoose validation with:

```javascript
runValidators: true
```

---

# 🧪 Testing Using Thunder Client

The APIs were tested using **Thunder Client** in Visual Studio Code.

### PATCH Request

```http
PATCH http://localhost:5500/api/users/:id
```

Request body:

```json
{
  "age": 23,
  "course": "MCA"
}
```

Successful response:

```text
200 OK
User updated successfully
```

---

### DELETE Request

```http
DELETE http://localhost:5500/api/users/:id
```

Successful response:

```text
200 OK
User deleted successfully
```

---

# ▶️ How to Run the Project

## Step 1 — Navigate to the project

```bash
cd "/Users/rashmeetkaur/Desktop/ BACKKEND DEVELOPMENT/05-ASSIGNMENTS/Assignment 9"
```

---

## Step 2 — Install dependencies

If dependencies are not already installed:

```bash
npm install
```

Or install Express and Mongoose directly:

```bash
npm install express mongoose
```

---

## Step 3 — Start MongoDB

Make sure the local MongoDB server is running.

The application uses:

```text
mongodb://127.0.0.1:27017/userdb
```

---

## Step 4 — Start the Express server

Run:

```bash
node server.js
```

The terminal should display:

```text
Server is running on port 5500
MongoDB connected successfully
```

---

# 🔄 API Flow

The overall application flow is:

```text
Client / Thunder Client
          │
          ▼
    Express Router
          │
          ▼
    Validate User ID
          │
          ▼
    Mongoose Model
          │
          ▼
       MongoDB
          │
          ▼
    Database Operation
          │
          ▼
      HTTP Response
```

### PATCH Flow

```text
PATCH /api/users/:id
        ↓
Read req.params.id
        ↓
Read req.body
        ↓
Validate ID
        ↓
Find User
        ↓
Update MongoDB Document
        ↓
200 OK
        ↓
User updated successfully
```

### DELETE Flow

```text
DELETE /api/users/:id
        ↓
Read req.params.id
        ↓
Validate ID
        ↓
Find User
        ↓
Delete MongoDB Document
        ↓
200 OK
        ↓
User deleted successfully
```

---

# 📸 Screenshots

The following screenshots demonstrate the working application and API testing.

## 1. MongoDB Connection

The Express server successfully connects to MongoDB and starts on port `5500`.

<img width="997" height="430" alt="mongodb-connection" src="https://github.com/user-attachments/assets/7084198b-d28b-4834-8517-c994b31c928d" />


---

## 2. Successful PATCH — Update User

The PATCH request updates the user's age and course using the MongoDB document ID.

### Request

```http
PATCH /api/users/:id
```

### Body

```json
{
  "age": 23,
  "course": "MCA"
}
```

### Response

```text
200 OK
User updated successfully
```

<img width="996" height="879" alt="patch-request" src="https://github.com/user-attachments/assets/47ce2ce7-b966-4840-932f-559e2417fafb" />


---

## 3. Successful DELETE — Delete User

The DELETE request removes the selected user using the MongoDB document ID.

### Request

```http
DELETE /api/users/:id
```

### Response

```text
200 OK
User deleted successfully
```

<img width="997" height="495" alt="delete-request" src="https://github.com/user-attachments/assets/acb512e4-7327-41d8-aa15-16826f0518bb" />


---

## 4. Project Folder Structure

The project follows the required separation of server, schema, model, and router files.

<img width="230" height="303" alt="folder-structure" src="https://github.com/user-attachments/assets/393f7f0e-8a58-46e9-b30f-76cf73b917cb" />


---

# 📊 Assignment Requirements Covered

| Requirement | Implementation |
|---|---|
| MongoDB Connection | Mongoose connection in `server.js` |
| Separate Schema | `schema/userSchema.js` |
| Separate Model | `model/userModel.js` |
| Separate Router | `router/userRouter.js` |
| PATCH API | `PATCH /api/users/:id` |
| Update Operation | `User.findByIdAndUpdate()` |
| DELETE API | `DELETE /api/users/:id` |
| Delete Operation | `User.findByIdAndDelete()` |
| Invalid ID Handling | `mongoose.Types.ObjectId.isValid()` |
| User Not Found | `404` response |
| Database Error Handling | `500` response |
| Request Validation | Mongoose validation |
| Testing | Thunder Client |

---

# 📚 Learning Outcomes

Through this assignment, I learned how to:

- Connect an Express.js application with MongoDB using Mongoose.
- Organize a backend project using separate schema, model, router, and server files.
- Work with MongoDB document IDs.
- Use `req.params` to access route parameters.
- Use `req.body` to receive updated information.
- Implement PATCH APIs using Express.js.
- Implement DELETE APIs using Express.js.
- Use `findByIdAndUpdate()` to modify MongoDB documents.
- Use `findByIdAndDelete()` to remove MongoDB documents.
- Apply Mongoose validation during update operations.
- Handle invalid IDs and missing users.
- Return meaningful HTTP status codes.
- Test REST APIs using Thunder Client.

---

# ✅ Conclusion

This assignment successfully extends the Express.js and MongoDB user management application by implementing **update and delete functionality** using Mongoose.

The application follows a clean and modular folder structure where the schema, model, routing logic, and server configuration are maintained separately.

The **PATCH API** successfully updates existing user information using the MongoDB document ID, while the **DELETE API** removes the selected user from the database. Proper validation and error handling have also been implemented for invalid IDs, missing users, invalid data, and database errors.

Overall, this assignment provided practical experience in building RESTful APIs and performing database operations using **Express.js, MongoDB, and Mongoose**.

---

## 👩‍💻 Author

**Rashmeet Kaur**

B.Tech Computer Science & Engineering  
ITM Skills University

---

⭐ **Express.js + MongoDB + Mongoose — Question 2: Update and Delete Users**
