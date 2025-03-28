import { Request, Response } from "express";
import BookService from "../services/bookService";
import { HttpStatus } from "../utils/httpStatus";
import { validateBookInput } from "../utils/validateBookInput";
import { Book } from "../models/bookModel";

class BookController {
  // get all books
  static getAllBooks(req: Request, res: Response): void {
    BookService.getAllBooks((err, books) => {
      if (err) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: err.message });
      }
      res.status(HttpStatus.OK).json({ success: true, data: books });
    });
  }

  // get one book
  static getBookById(req: Request, res: Response): void {
    const { id } = req.params;

    //if id is a valid number
    const bookId = parseInt(id, 10);
    if (isNaN(bookId)) {
      // not valid
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Invalid book ID, it should be a number",
      });
      return;
    }

    BookService.getBookById(bookId, (err, book) => {
      if (err) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: err.message });
      }

      if (!book) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "Book not found" });
      }

      return res.status(HttpStatus.OK).json({ success: true, data: book });
    });
  }

  //add one book
  static addBook(req: Request, res: Response): void {
    const { title, author, year, available } = req.body;
    const newBook = { title, author, year, available };

    const isValidateInput = validateBookInput(newBook);
    if (!isValidateInput) {
      // not valid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid book info",
      });
      return;
    }

    BookService.addBook(newBook, (err, bookId) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      return res
        .status(201)
        .json({ success: true, data: { id: bookId, ...newBook } });
    });
  }
}

export default BookController;
