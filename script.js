"use strict";

let storedBooks = JSON.parse(localStorage.getItem('storedBooks')) || [];

// WILL VERIFY IF BOOK OBJECTS ARE INSIDE ARRAY
storedBooks = storedBooks.map(book => new Book(book.title, book.author, book.pages, book.read));

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// STORES BOOK OBJECTS AND UPDATES LOCAL STORAGE API
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
        if (bookTitle === "" || bookAuthor === "" || numberOfPages === "" || numberOfPages <= 0) return;
        let book = new Book(bookTitle, bookAuthor, numberOfPages, false); // 
        book.storeBookObject();
    }
    
    addBookToLibrary(bookTitle, bookAuthor, numberOfPages);
    displayLibrary();

    form.reset();
}

function displayLibrary() {
    const newBook_overlay = document.querySelector('.add-new-book-button');
    const newBook_btn = document.querySelector('.newBook_overlay_btn');
    const bookForm = document.querySelector('.add-book-form');
    const bookCase = document.querySelector('.book-case');

    bookCase.innerHTML = "";
    
    storedBooks.forEach((book, index) => {
        const bookInfo = document.createElement('div');

        bookInfo.style.position = "relative";
        bookInfo.classList.add('book-entry');
        bookInfo.dataset.index = index;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "✖";
        deleteButton.setAttribute("style", "position: absolute; top: 10px; left: 15px;  cursor: pointer; background-color: burlywood; color: black; width: 26px; height: 26px; margin: 3px;  border: 2px inset rgb(169, 110, 0); border-radius: 100px; font-weight: bolder; z-index: 1");

        bookInfo.innerHTML = `
            <div class="book-cover-top">
             <p>&#128323; Title &#128324;</p> 
             <p>${book.title}</p>
             <p>&#x1F540; Author &#x1F540;</p> 
             <p>${book.author}</p>
             <p>&#x1F56E; Pages &#x1F56E;</p> 
             <p>${book.pages}</p>
            </div>
            <div class="book-cover-bottom">
            <p>Read?</p>
            <button type="button" class="yes-button">✔️</button>
            <button type="button" class="no-button">✖️</button>
            </div>
        `;

        bookInfo.appendChild(deleteButton);
        bookCase.appendChild(bookInfo);

        // APPLY "READ" OVERLAY IF BOOK IS MARKED AS READ
        if (book.read) {
            addReadOverlay(bookInfo);
        }

        // DELETE BOOK
        deleteButton.addEventListener("click", (e) => {
            const bookEntry = e.target.closest('.book-entry'); 
            const index = bookEntry.dataset.index; 
            storedBooks.splice(index, 1); 
            localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
            displayLibrary();
        });

        // "READ" BUTTON
        bookInfo.querySelector('.yes-button').addEventListener('click', () => {
            if (!book.read) {
                book.read = true;
                localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
                addReadOverlay(bookInfo);
            }
        });

        // "NOT READ" BUTTON
        bookInfo.querySelector('.no-button').addEventListener('click', () => {
            if (book.read) {
                book.read = false;
                localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
                removeReadOverlay(bookInfo);
            }
        });
    });

       // MAKES OVERLAY DISAPPEAR AND BOOK & FORM ELEMENTS APPEAR
       newBook_btn.addEventListener('click', function() {
        newBook_overlay.style.display = "none";
        bookCase.style.opacity = 1;
        bookForm.style.opacity = 1;
        bookForm.style.transform = "translateX(0)";
    })
}

// FUNCTION TO ADD "READ" OVERLAY
function addReadOverlay(bookInfo) {
    if (!bookInfo.querySelector('.overlay')) {
        const bookOverlay = document.createElement('div');
        bookOverlay.classList.add('overlay');
        bookOverlay.innerHTML = '<img class="bookOverlay_img" src="./images/read-stamp.png">'
        bookOverlay.setAttribute("style", "font-size: 4rem; font-weight: bolder; color: orange; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; justify-content: center; align-items: center; box-shadow: -3px -3px 10px orange");
        bookInfo.appendChild(bookOverlay);
    }
}

// FUNCTION TO REMOVE "READ" OVERLAY
function removeReadOverlay(bookInfo) {
    const overlay = bookInfo.querySelector('.overlay');
    if (overlay) overlay.remove();
}

// LOADS AND PARSES THROUGH HTML CONTENT BEFORE JS INTERACTS WITH DOM ELEMENTS
document.addEventListener("DOMContentLoaded", displayLibrary);

// INITIATES BOOK OBJECTS TO BE ADDED TO BOOKCASE
document.querySelector("#addBookButton").addEventListener("click", bookDetails);
