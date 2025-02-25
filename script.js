"use strict";

const storedBooks = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// PUSHES THE BOOK OBJECT ITSELF INTO THE STOREDBOOKS ARRAY
Book.prototype.storeBookObject = function() {
    storedBooks.push(this);
}

function bookDetails() {
    const form = document.querySelector('#book-form');
    const bookTitle = document.querySelector('#book_title').value;
    const bookAuthor = document.querySelector('#book_author').value;
    const numberOfPages = document.querySelector('#number_pages').value;

    function addBookToLibrary(bookTitle, bookAuthor, numberOfPages) {
        if(bookTitle === "" || bookAuthor === "" || numberOfPages === "") return
        let book = new Book(bookTitle, bookAuthor, numberOfPages)
        book.storeBookObject();
    }
    addBookToLibrary(bookTitle, bookAuthor, numberOfPages);
    displayLibrary();

    form.reset();
}

function displayLibrary() {
    const bookCase = document.querySelector('.book-case');
    const bookInfo = document.createElement('div');

    storedBooks.forEach((book, index) => {
        // CHECKS TO SEE IF A BOOK DIV ALREADY EXISTS
        if (document.querySelector(`[data-index='${index}']`)) return;

        bookInfo.style.position = "relative";
        bookInfo.style.fontSize = "small";
        bookInfo.classList.add('book-entry');
        bookInfo.dataset.index = index;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "x";

        deleteButton.setAttribute("style", "position: absolute; display: flex; justify-content: center; align-items: cener; position: absolute; top: 0; left: 0; background-color: orange; color: white; width: 26px; height: 26px; margin: 3px; border-radius: 100px; font-weight: bolder; z-index: 1");

        // DYNAMICALLY CREATES HTML ELEMENTS
        bookInfo.innerHTML = `
        <strong>Title:</strong> ${book.title} <br>
        <strong>Author:</strong> ${book.author} <br>
        <strong>Pages:</strong> ${book.pages} <br>
        <fieldset>
            <legend>Have you read book?</legend>
            <button type="button" class="yes-button">Yes</button>
            <button type="button" class="no-button">No</button>
        </fieldset>
    `;
        bookInfo.appendChild(deleteButton);
        bookCase.appendChild(bookInfo);

        // DELETES INDIVIDUAL BOOK DIVS BY ADDRESSING THEIR INDEX POSITION
        deleteButton.addEventListener("click", (e) => {
            const bookEntry = e.target.closest('.book-entry'); 
            const index = bookEntry.dataset.index; 
            storedBooks.splice(index, 1); 
            bookEntry.remove();
        });
        
    });

    document.querySelectorAll('.yes-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookEntry = e.target.closest('.book-entry');
            if (bookEntry) {
                if (!bookEntry.querySelector('.overlay')) {
                    const bookOverlay = document.createElement('div');
                    const overlayPara = document.createElement('p');

                    bookOverlay.classList.add('overlay'); 
                    overlayPara.innerText = "READ";
                    bookOverlay.appendChild(overlayPara);
                    bookOverlay.setAttribute("style", "font-size: 2.5rem; font-weight: bolder; color: orange; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; justify-content: center; align-items: center; box-shadow: -6px 6px 30px orange");
                    bookEntry.appendChild(bookOverlay);
                }
            }
        });
    });
    
    document.querySelectorAll('.no-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookEntry = e.target.closest('.book-entry');
            if (bookEntry) {
                const overlay = bookEntry.querySelector('.overlay');
                if (overlay) {
                    overlay.remove();
                }
            }
        });
    });

    document.querySelectorAll('.yes-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookEntry = e.target.closest('.book-entry');
            if (bookEntry) {
                if (!bookEntry.querySelector('.overlay')) {
                    const bookOverlay = document.createElement('div');
                    const overlayPara = document.createElement('p');
                    const deleteButton = document.createElement('button');

                    bookEntry.style.position = "relative";
                    deleteButton.innerText = "x";
                    bookOverlay.classList.add('overlay'); 
                    overlayPara.innerText = "READ";
                    bookOverlay.appendChild(overlayPara);
                    deleteButton.setAttribute("style", "display: flex; justify-content: center; align-items: cener; position: absolute; top: 0; left: 0; background-color: orange; color: white; width: 26px; height: 26px; margin: 3px; border-radius: 100px; font-weight: bolder");
                    bookOverlay.setAttribute("style", "font-size: 2.5rem; font-weight: bolder; color: orange; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; justify-content: center; align-items: center; box-shadow: -6px 6px 30px orange");
                    bookEntry.appendChild(bookOverlay);
                    bookEntry.appendChild(deleteButton);
                }
            }
        });
    });
}
document.querySelector("#addBookButton").addEventListener("click", bookDetails);