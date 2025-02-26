"use strict";

let storedBooks = JSON.parse(localStorage.getItem('storedBooks')) || [];
storedBooks = storedBooks.map(book => new Book(book.title, book.author, book.pages));

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.storeBookObject = function() {
    storedBooks.push(this);
    localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
}

function bookDetails() {
    const form = document.querySelector('#book-form');
    const bookTitle = document.querySelector('#book_title').value;
    const bookAuthor = document.querySelector('#book_author').value;
    const numberOfPages = document.querySelector('#number_pages').value;

    function addBookToLibrary(bookTitle, bookAuthor, numberOfPages) {
        if(bookTitle === "" || bookAuthor === "" || numberOfPages === "") return;
        let book = new Book(bookTitle, bookAuthor, numberOfPages);
        book.storeBookObject();
    }
    
    addBookToLibrary(bookTitle, bookAuthor, numberOfPages);
    displayLibrary();

    form.reset();
}

function displayLibrary() {
    const bookCase = document.querySelector('.book-case');
    bookCase.innerHTML = "";

    storedBooks.forEach((book, index) => {
        const bookInfo = document.createElement('div');
        bookInfo.style.position = "relative";
        bookInfo.style.fontSize = "small";
        bookInfo.classList.add('book-entry');
        bookInfo.dataset.index = index;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "x";
        deleteButton.setAttribute("style", "position: absolute; top: 0; left: 0; background-color: orange; color: white; width: 26px; height: 26px; margin: 3px; border-radius: 100px; font-weight: bolder; z-index: 1");

        bookInfo.innerHTML = `
            <strong>Title:</strong> ${book.title} <br>
            <strong>Author:</strong> ${book.author} <br>
            <strong>Pages:</strong> ${book.pages} <br>
            <fieldset>
                <legend>Have you read the book?</legend>
                <button type="button" class="yes-button">Yes</button>
                <button type="button" class="no-button">No</button>
            </fieldset>
        `;

        bookInfo.appendChild(deleteButton);
        bookCase.appendChild(bookInfo);

        // DELETE BOOK
        deleteButton.addEventListener("click", (e) => {
            const bookEntry = e.target.closest('.book-entry'); 
            const index = bookEntry.dataset.index; 
            storedBooks.splice(index, 1); 
            localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
            displayLibrary(); 
        });

        bookInfo.querySelector('.yes-button').addEventListener('click', () => {
            if (!bookInfo.querySelector('.overlay')) {
                const bookOverlay = document.createElement('div');
                bookOverlay.classList.add('overlay');
                bookOverlay.innerText = "READ";
                bookOverlay.setAttribute("style", "font-size: 2.5rem; font-weight: bolder; color: orange; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; justify-content: center; align-items: center; box-shadow: -6px 6px 30px orange");
                bookInfo.appendChild(bookOverlay);
            }
        });

        bookInfo.querySelector('.no-button').addEventListener('click', () => {
            const overlay = bookInfo.querySelector('.overlay');
            if (overlay) overlay.remove();
        });
    });
}

document.addEventListener("DOMContentLoaded", displayLibrary);
document.querySelector("#addBookButton").addEventListener("click", bookDetails);
