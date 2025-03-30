import express from "express";
import BookController from "./bookController";

const bookRouter = express.Router();

// Fetches all books
bookRouter.get("/", BookController.getAllBooks);

// Fetches the details of a specific book by its id
bookRouter.get("/:id", BookController.getBookById);

// Adds a new book to the collection
bookRouter.post("/", BookController.addBook);

// Updates the details of a specific book by its id
bookRouter.put("/:id", BookController.updateBook);

// Deletes a specific book identified by its id
bookRouter.delete("/:id", BookController.deleteBook);

export default bookRouter;
