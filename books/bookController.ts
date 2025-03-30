import { Request, Response } from "express";
import BookService from "./bookService";
import { HttpStatus } from "../utils/httpStatus";
import { validateBookInput } from "../utils/validateBookInput";

class BookController {
  // validate book id
  private static validateBookId(id: string): null | number {
    const bookId = parseInt(id, 10);
    if (isNaN(bookId)) {
      return null;
    }
    return bookId;
  }

  // get all books
  static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookService.getAllBooks();
      if (books && books.length > 0) {
        res.status(HttpStatus.OK).json({ success: true, data: books });
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "No books found." });
        return;
      }
    } catch (err: any) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "An error occurred while fetching the books. Please try again later.",
      });
    }
  }

  // get one book
  static async getBookById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    //if id is a valid number
    const bookId = BookController.validateBookId(id);
    if (bookId === null) {
      // id invalid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          "Couldn't find the resource you're looking for. Please verify the URL and try again.",
      });
      return;
    }
    try {
      const books = await BookService.getBookById(bookId);
      if (books && books.length == 1) {
        res.status(HttpStatus.OK).json({ success: true, data: books });
        return;
      } else if (books && books.length == 0) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "Book not found." });
        return;
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "An unexpected error occurred. Please try again later.",
        });
        return;
      }
    } catch (err: any) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "An error occurred while fetching the book information. Please try again later.",
      });
    }
  }

  //add one book
  static async addBook(req: Request, res: Response): Promise<void> {
    const { title, author, year, available } = req.body;
    const newBook = { title, author, year, available };

    //if newBook is valid
    const isValidateInput = validateBookInput(newBook);
    if (!isValidateInput) {
      // not valid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Please provide valid book info",
      });
      return;
    }
    try {
      const result = await BookService.addBook(newBook);
      if (result == 1) {
        res.status(HttpStatus.CREATED).json({ success: true });
        return;
      }

      throw new Error("Failed to add the book");
    } catch (err: any) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "An error occurred while adding the book into system. Please try again later.",
      });
    }
  }

  //update one book
  static async updateBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, author, year, available } = req.body;
    const updatedBook = { title, author, year, available };

    //if id is a valid number
    const bookId = BookController.validateBookId(id);
    if (bookId === null) {
      // id invalid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          "Couldn't find the resource you're looking for. Please verify the URL and try again.",
      });
      return;
    }

    //if newBook is valid
    const isValidateInput = validateBookInput(updatedBook);
    if (!isValidateInput) {
      // not valid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Please provide valid book info",
      });
      return;
    }

    try {
      const result = await BookService.updateBook(bookId, updatedBook);
      if (result == 1) {
        res.status(HttpStatus.OK).json({ success: true });
        return;
      }

      throw new Error("Failed to update the book");
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "An error occurred while updating book information. Please try again later.",
      });
    }
  }

  // delete one book
  static async deleteBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    //if id is a valid number
    const bookId = BookController.validateBookId(id);
    if (bookId === null) {
      // id invalid
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          "Couldn't find the resource you're looking for. Please verify the URL and try again.",
      });
      return;
    }

    try {
      const result = await BookService.deleteBook(bookId);
      if (result == 1) {
        res.status(HttpStatus.OK).json({ success: true });
        return;
      }

      throw new Error("Failed to delete the book");
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "An error occurred while removing book from system. Please try again later.",
      });
    }
  }
}

export default BookController;
