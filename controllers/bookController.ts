import { Request, Response } from "express";
import BookService from "../services/bookService";
import { HttpStatus } from "../utils/httpStatus";

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
}

export default BookController;
