import { Book } from "../models/bookModel";
import BookModel from "../models/bookModel";

class BookService {
  static getAllBooks(
    callback: (err: Error | null, books: Book[]) => void
  ): void {
    BookModel.getAllBooks(callback);
  }
}

export default BookService;
