import sqlite3 from "sqlite3";
sqlite3.verbose();

//create database file
const db = new sqlite3.Database("./db/database.db");

//create table
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            year INTEGER NOT NULL,
            available BOOLEAN NOT NULL
        );
    `);

  //add data
  db.run("INSERT INTO books (title, author, year,available) VALUES (?,?,?,?)", [
    "Learn Java in One Day and Learn It Well",
    "Jamie Chan",
    2022,
    true,
  ]);
});

export default db;
