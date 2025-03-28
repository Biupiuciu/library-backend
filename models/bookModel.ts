import db from "../db/initDatabase";

export interface Book {
  id: number;
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
}

export default BookModel;
