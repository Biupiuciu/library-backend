import { Request, Response } from "express";
import BookService from "../services/bookService";
import { HttpStatus } from "../utils/httpStatus";
import { validateBookInput } from "../utils/validateBookInput";

class BookController {
  // validate book id
  private static validateBookId(id: string, res: Response): null | number {
    const bookId = parseInt(id, 10);
    if (isNaN(bookId)) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Invalid book ID, it should be a number",
      });
      return null;
    }
    return bookId;
  }

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
    const bookId = BookController.validateBookId(id, res);
    if (bookId === null) return;

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

    //if newBook is valid
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
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: err.message });
      }

      return res
        .status(HttpStatus.CREATED)
        .json({ success: true, data: { id: bookId, ...newBook } });
    });
  }

  //update one book
  static updateBook(req: Request, res: Response): void {
    const { id } = req.params;
    const { title, author, year, available } = req.body;
    const updatedBook = { title, author, year, available };

    //if id is a valid number
    const bookId = BookController.validateBookId(id, res);
    if (bookId === null) return;

    //if newBook is valid
    const isValidateInput = validateBookInput(updatedBook);
    if (!isValidateInput) {
      // not valid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid book info",
      });
      return;
    }

    BookService.updateBook(bookId, updatedBook, (err, changes) => {
      if (err) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: err.message });
      }

      if (changes === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "Book not found" });
      }

      return res
        .status(HttpStatus.OK)
        .json({ success: true, data: updatedBook });
    });
  }

  // delete one book
  static deleteBook(req: Request, res: Response): void {
    const { id } = req.params;

    //if id is a valid number
    const bookId = BookController.validateBookId(id, res);
    if (bookId === null) return;

    BookService.deleteBook(bookId, (err, changes) => {
      if (err) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: err.message });
      }
      if (changes === 0) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "Book not found" });
      }
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Book deleted" });
    });
  }
}

export default BookController;
