import db from "../db/initDatabase";

export interface Book {
  id?: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
}

class BookModel {
  // get all books
  static getAllBooks(callback: (err: Error | null, rows: any[]) => void): void {
    const query = "SELECT * FROM books";
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }

  //get single book by id
  static getBookById(
    id: number,
    callback: (err: Error | null, row: any) => void
  ): void {
    const query = "SELECT * FROM books WHERE id = ?";
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  }

  //add one book
  static addBook(
    book: Book,
    callback: (err: Error | null, lastID: number) => void
  ): void {
    const query =
      "INSERT INTO books (title, author, year, available) VALUES (?, ?, ?, ?)";
    db.run(
      query,
      [book.title, book.author, book.year, book.available],
      function (err) {
        callback(err, this.lastID);
      }
    );
  }
}

export default BookModel;
