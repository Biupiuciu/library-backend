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
}

export default BookService;
