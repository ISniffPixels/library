"use strict";

const storedBooks = [];

function Book(title, author, pages, bookRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.bookRead = bookRead;
}

Book.prototype.addBookToLibrary = function() {
    storedBooks.push(this);
}

function bookDetails() {
    const bookTitle = document.querySelector('#book_title').value;
    const bookAuthor = document.querySelector('#book_author').value;
    const numberOfPages = document.querySelector('#number_pages').value;

    function addBook(bookTitle) {
        let book = new Book(bookTitle, bookAuthor, numberOfPages, true)
        book.addBookToLibrary();
    }
    addBook(bookTitle);
    displayLibrary();
}

function displayLibrary() {
    const bookCase = document.querySelector('.book-case');
    bookCase.innerHTML = "";

    storedBooks.forEach(book => {
        const bookInfo = document.createElement('div');
        
        bookInfo.innerHTML = `
        <strong>Title:</strong> ${book.title} <br>
        <strong>Author:</strong> ${book.author} <br>
        <strong>Pages:</strong> ${book.pages} <br>
        <strong>Have read?:</strong> ${book.bookRead ? "Yes" : "No"}
    `;

        bookCase.appendChild(bookInfo);
    });
}

document.querySelector("#addBookButton").addEventListener("click", bookDetails);