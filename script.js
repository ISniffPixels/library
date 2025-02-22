"use strict";
function Book(title, author, pages, bookRead) {
	this.storedBooks = [];
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.bookRead = bookRead;
}

Book.prototype.addBookToLibrary = function() {
    let bookInfo = `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Have read book?: ${this.bookRead}`;
    this.storedBooks.push(bookInfo);
    return bookInfo;
}

Book.prototype.loopThroughBooks = function() {
	for(let i=0; i < this.storedBooks.length; i++) {
  	return this.storedBooks[i];
	}
}

const bookOfTruths = new Book('Ass Hat McGee', 'Big Dick', 269, true)
const bookOfHoes = new Book('Slap A Hoe Twice', 'Charleston White', 500, false)

console.log(bookOfTruths.addBookToLibrary());
console.log(bookOfTruths.storedBooks);
console.log(bookOfTruths.loopThroughBooks());
console.log(bookOfHoes.addBookToLibrary());
console.log(bookOfHoes.storedBooks);
console.log(bookOfHoes.loopThroughBooks());
