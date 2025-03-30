import { Book } from "../books/bookModel";
import BookModel from "../books/bookModel";

class BookService {
  static getAllBooks(): Promise<Book[] | null> {
    return BookModel.getAllBooks();
  }

  static getBookById(id: number): Promise<Book[] | null> {
    return BookModel.getBookById(id);
  }

  static addBook(book: Book): Promise<number> {
    return BookModel.addBook(book);
  }

  static updateBook(id: number, updateBook: Book): Promise<number> {
    return BookModel.updateBook(id, updateBook);
  }

  static deleteBook(id: number): Promise<number> {
    return BookModel.deleteBook(id);
  }
}

export default BookService;
