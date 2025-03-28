import express from "express";
import BookController from "../controllers/bookController";

const router = express.Router();

// Fetches all books
router.get("/books", BookController.getAllBooks);

// Fetches the details of a specific book by its unique id
router.get("/books/:id", BookController.getBookById);

// Adds a new book to the collection
router.post("/books", BookController.addBook);

// Updates the details of a specific book by its id
router.put("/books/:id", BookController.updateBook);

// Deletes a specific book identified by its id
router.delete("/books/:id", BookController.deleteBook);

export default router;
