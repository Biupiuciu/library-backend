import express from "express";
import BookController from "../controllers/bookController";

const router = express.Router();

// Fetches all books
router.get("/books");

// Fetches the details of a specific book by its unique id
router.get("/books/:id");

// Adds a new book to the collection
router.post("/books");

// Updates the details of a specific book by its id
router.put("/books/:id");

// Deletes a specific book identified by its id
router.delete("/books/:id");

export default router;
