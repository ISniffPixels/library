"use strict";

function Book(title, author, bookRead) {
    this.bookInfo = [];

    this.title = title;
    this.author = author;
    this.bookRead = bookRead;
}

Book.prototype.addBookToLibrary = function() {
    let bookInfo = `${this.title}, ${this.author}, ${this.bookRead}`;
    return bookInfo;
}

const bookOfTruths = new Book('Ass Hat McGee', 'Big Dick', true)
bookOfTruths.addBookToLibrary();
