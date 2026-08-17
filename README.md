# Student Management System

A full-stack Student Management System built using Node.js, Express.js, and MongoDB.

## Features

- Add student details
- Store student data in MongoDB
- View all registered students
- Pagination for student records
- Delete student records
- Simple and responsive UI

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB

## Project Structure

student-management/
│
├── models/
├── public/
│   ├── form.html
│   └── data.html
├── server.js
├── package.json
└── package-lock.json

## How to Run

1. Clone the repository.
2. Install dependencies:

npm install

3. Start the server:

node server.js

4. Open:

http://localhost:5000/form.html

## API

### POST

`/api/students`

Used to add student data to MongoDB.

### GET

`/api/students`

Used to retrieve student data with pagination.

### DELETE

`/api/students/:id`

Used to delete a student.

## Author

Arkadip Das
