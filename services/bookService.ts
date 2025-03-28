import { Book } from "../models/bookModel";
import BookModel from "../models/bookModel";

class BookService {
  static getAllBooks(
    callback: (err: Error | null, books: Book[]) => void
  ): void {
    BookModel.getAllBooks(callback);
  }

  static getBookById(
    id: number,
    callback: (err: Error | null, book: Book | undefined) => void
  ): void {
    BookModel.getBookById(id, callback);
  }

  static addBook(
    book: Book,
    callback: (err: Error | null, bookId: number) => void
  ): void {
    BookModel.addBook(book, callback);
  }

  static updateBook(
    id: number,
    updateBook: Book,
    callback: (err: Error | null, changes: number) => void
  ): void {
    BookModel.updateBook(id, updateBook, callback);
  }

  static deleteBook(
    id: number,
    callback: (err: Error | null, changes: number) => void
  ): void {
    BookModel.deleteBook(id, callback);
  }
}

export default BookService;
