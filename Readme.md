Task Manager API
Overview
Task Manager API is a RESTful API built using Node.js and Express.js for managing tasks. The application uses in-memory data storage and supports full CRUD (Create, Read, Update, Delete) operations.
The API includes input validation and error handling to ensure data integrity and reliability.
Features
•	Create a new task
•	Retrieve all tasks
•	Retrieve a task by ID
•	Update an existing task
•	Delete a task
•	Input validation for task creation and updates
•	Proper HTTP status codes and error handling
________________________________________
Technology Stack
•	Node.js
•	Express.js
•	Supertest
•	Tap
________________________________________
Project Structure
.
├── controllers
│   └── taskController.js
├── routes
│   └── taskRoutes.js
├── validators
│   └── taskValidator.js
├── test
│   └── server.test.js
├── app.js
├── server.js
├── task.json
├── package.json
└── README.md
________________________________________
Prerequisites
•	Node.js v18 or higher
•	npm
Verify installation:
node -v
npm -v
________________________________________
Installation
Clone the repository:
git clone <repository-url>
cd task-manager-api
Install dependencies:
npm install
________________________________________
Running the Application
Start the server:
npm start
The application will run on:
http://localhost:3000
________________________________________
Running Tests
Execute the automated test suite:
npm test
Expected output:
PASS test/server.test.js
________________________________________
API Endpoints
1. Get All Tasks
Retrieve all available tasks.
Request
GET /tasks
Example
GET http://localhost:3000/tasks
Response
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  }
]
________________________________________
2. Get Task by ID
Retrieve a specific task using its ID.
Request
GET /tasks/:id
Example
GET http://localhost:3000/tasks/1
Success Response
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
Error Response
{
  "error": "Task not found"
}
Status Code:
404 Not Found
________________________________________
3. Create Task
Create a new task.
Request
POST /tasks
Example Request Body
{
  "title": "Learn Express",
  "description": "Build REST APIs using Express",
  "completed": false
}
Success Response
{
  "id": 16,
  "title": "Learn Express",
  "description": "Build REST APIs using Express",
  "completed": false
}
Status Code:
201 Created
Validation Error
{
  "error": "Title is required and cannot be empty"
}
Status Code:
400 Bad Request
________________________________________
4. Update Task
Update an existing task by ID.
Request
PUT /tasks/:id
Example Request Body
{
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}
Success Response
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}
Status Code:
200 OK
Error Responses
Invalid ID:
{
  "error": "Task not found"
}
Status Code:
404 Not Found
Invalid Data:
{
  "error": "Completed must be a boolean value"
}
Status Code:
400 Bad Request
________________________________________
5. Delete Task
Delete a task by ID.
Request
DELETE /tasks/:id
Example
DELETE http://localhost:3000/tasks/1
Success Response
{
  "message": "Task deleted successfully"
}
Status Code:
200 OK
Error Response
{
  "error": "Task not found"
}
Status Code:
404 Not Found
________________________________________
Validation Rules
The following validations are enforced when creating or updating a task:
Field	Validation
title	Required, non-empty string
description	Required, non-empty string
completed	Required, boolean value
Examples of invalid payloads:
{
  "title": "",
  "description": "Test",
  "completed": false
}
{
  "title": "Test",
  "description": "",
  "completed": false
}
{
  "title": "Test",
  "description": "Test",
  "completed": "false"
}
All invalid payloads return:
400 Bad Request
________________________________________
Author
Shubham Samadder
