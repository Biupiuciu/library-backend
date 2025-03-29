# library-backend

## Description

This project is a Express app built with TypeScript for handling common CRUD operations regarding books resource. It provides API endpoints for managing books, including creating, reading, updating, and deleting book records.

## Installation

First, clone this repository to your local machine and navigate to the project directory:

```
git clone https://github.com/Biupiuciu/library-backend.git
cd library-backend
```

Then, install the dependencies using npm:

```
npm install
```

## Running the Project

To run the application, use the following command in the root directory of the project:

```
npx tsx app.ts
```

This will start the server, which will listen at http://localhost:3000 (or the port you have configured).

## Environment Variables

If you are using environment variables, create a .env file and add the necessary variables. For example:

```
PORT=80
```

## API Endpoints

Here are the available API endpoints:

- GET /api/books – Get all books

- POST /api/books – Add a new book

- GET /api/books/:id – Get details of a specific book by Id

- PUT /api/books/:id – Update an existing book by Id

- DELETE /api/books/:id – Delete a book by Id
