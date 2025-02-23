"use strict";

const storedBooks = [];

function Book(title, author, pages, bookRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.bookRead = bookRead;
}

Book.prototype.addBookToLibrary = function() {
    let bookInfo = `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Have read book?: ${this.bookRead}`;
    storedBooks.push(bookInfo);
    return bookInfo;
}

const bookOfTruths = new Book('Ass Hat McGee', 'Big Dick', 269, true)
const bookOfHoes = new Book('Slap A Hoe Twice', 'Charleston White', 500, false)

console.log(bookOfTruths.addBookToLibrary());
console.log(bookOfHoes.addBookToLibrary());
storedBooks.forEach(book => console.log(book));