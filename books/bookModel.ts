import { resolve } from "path";
import db from "./initDatabase";

export interface Book {
  id?: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
}

class BookModel {
  // get all books
  static getAllBooks(): Promise<Book[] | null> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM books";
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(new Error("Error occurs while fetching the data. "));
        } else {
          resolve(rows as Book[] | null);
        }
      });
    });
  }

  //get single book by id
  static getBookById(id: number): Promise<Book[] | null> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM books WHERE id = ?";
      db.all(query, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Book[] | null);
        }
      });
    });
  }

  //add one book
  static addBook(book: Book): Promise<number> {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO books (title, author, year, available) VALUES (?, ?, ?, ?)";
      db.run(
        query,
        [book.title, book.author, book.year, book.available],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes); //number of rows affected
          }
        }
      );
    });
  }

  //update one book
  static updateBook(id: number, book: Book): Promise<number> {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE books SET title = ?, author = ?, year = ?, available = ? WHERE id = ?";
      db.run(
        query,
        [book.title, book.author, book.year, book.available, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes); //number of rows affected
          }
        }
      );
    });
  }

  //delete one book
  static deleteBook(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM books WHERE id = ?";
      db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes); //number of rows affected
        }
      });
    });
  }
}

export default BookModel;
