class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // TOGGLE READ NOT READ HELPER FUNCTION
  static toggleRead() {
    this.read = !this.read;
  }
}

// SEPERATE LIBRARY CLASS THAT HANDLES RENDERING, STORAGE, AND OTHER MANIPULATIONS HAVING TO DO WITH BOOK OBJECTS
class Library {
  constructor() {
    // LOADS STORED BOOKS FROM LOCALSTORAGE AND LOOPS THROUGH STORED BOOK OBJECTS CREATING NEW INSTANCES
    this.storedBooks = this.loadBooks();
    
    // DOM ELEMENT CACHE
    this.bookCase = document.querySelector('.book-case');
    this.bookForm = document.querySelector('.add-book-form');
    this.addNewBookBtn = document.querySelector("#addBookButton");
    this.newBookOverlay = document.querySelector('.add-new-book-overlay');
    this.newBookBtn = document.querySelector('.newBook_overlay_btn');
    this.form = document.querySelector('#book-form');

    this.addNewBookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.addBookFromForm();
      });
  }
  
  // LOADS BOOK OBJECTS FROM LOCALSTORAGE AND LOOPS THROUGH THEM WITH THE MAP METHOD TO ADD THEM TO CLASS INSTANCES
  loadBooks() {
    const booksData = JSON.parse(localStorage.getItem('storedBooks')) || [];
    return booksData.map(bookData => new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.read
    ));
  }
  
  // UPDATES LOCALSTORAGE WITH NEW BOOK OBJECT ADDITIONS
  updateLocalStorage() {
    localStorage.setItem('storedBooks', JSON.stringify(this.storedBooks));
  }
  
  // ADDS NEW BOOK TO LIBRARY
  addBook(book) {
    this.storedBooks.push(book);
    this.updateLocalStorage();
    this.displayLibrary();
  }
  
  // TAKES DATA FROM FORM INPUTS AND CREATES NEW BOOK OBJECTS
  addBookFromForm() {
    const bookTitle = document.querySelector('#book_title').value;
    const bookAuthor = document.querySelector('#book_author').value;
    const numberOfPages = document.querySelector('#number_pages').value;
    
    if (bookTitle === "" || bookAuthor === "" || numberOfPages === "" || numberOfPages <= 0) return;

    
    const book = new Book(bookTitle, bookAuthor, numberOfPages, false);
    this.addBook(book);
    this.form.reset();
  }
  
  // RENDERS THE LIBRARY UI
  displayLibrary() {
    // CLEARS BOOK CASE TO PREVENT DUPLICATE BOOK OBJECTS
    this.bookCase.innerHTML = "";
    
    // CREATES BOOK OBJECTS AND ASSIGNS ATTRIBUTES TO THEM
    this.storedBooks.forEach((book, index) => {
      const bookInfo = document.createElement('div');
      bookInfo.style.position = "relative";
      bookInfo.classList.add('book-entry');
      bookInfo.dataset.index = index;
      
      const deleteButton = document.createElement('button');
      deleteButton.innerText = "✖";
      deleteButton.setAttribute("style", "position: absolute; top: 10px; left: 15px; cursor: pointer; background-color: burlywood; color: black; width: 26px; height: 26px; margin: 3px; border: 2px inset rgb(169, 110, 0); border-radius: 100px; font-weight: bolder; z-index: 1");
      
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
      this.bookCase.appendChild(bookInfo);
      
      // IF BOOK IS MARKED AS READ ADDS OVERLAY
      if (book.read) {
        this.addReadOverlay(bookInfo);
      }
      
      // DELETE BOOK
      deleteButton.addEventListener("click", () => {
        this.storedBooks.splice(index, 1);
        this.updateLocalStorage();
        this.displayLibrary();
      });
      
      // MARKS BOOK AS READ
      bookInfo.querySelector('.yes-button').addEventListener('click', () => {
        if (!book.read) {
          book.read = true;
          this.updateLocalStorage();
          this.addReadOverlay(bookInfo);
        }
      });
      
      // MARKS BOOK AS NOT READ
      bookInfo.querySelector('.no-button').addEventListener('click', () => {
        if (book.read) {
          book.read = false;
          this.updateLocalStorage();
          this.removeReadOverlay(bookInfo);
        }
      });
    });
    
    // INITIALIZES APPLICATION
    this.newBookBtn.addEventListener('click', () => {
      this.newBookOverlay.style.display = "none";
      this.bookCase.style.opacity = 1;
      this.bookForm.style.opacity = 1;
      this.bookForm.style.transform = "translateX(0)";
    });
  }
  
  // ADDS READ OVERLAY
  addReadOverlay(bookInfo) {
    if (!bookInfo.querySelector('.overlay')) {
      const bookOverlay = document.createElement('div');
      bookOverlay.classList.add('overlay');
      bookOverlay.innerHTML = '<img class="bookOverlay_img" src="./images/read-stamp.png">';
      bookOverlay.setAttribute("style", "font-size: 4rem; font-weight: bolder; color: orange; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; justify-content: center; align-items: center; box-shadow: -3px -3px 10px orange");
      bookInfo.appendChild(bookOverlay);
    }
  }
  
  // REMOVES READ OVERLAY 
  removeReadOverlay(bookInfo) {
    const overlay = bookInfo.querySelector('.overlay');
    if (overlay) overlay.remove();
  }
}

// DOME CONTENT WILL COMPLETELY LOAD BEFORE LIBRARY IS RENDERED
document.addEventListener("DOMContentLoaded", () => {
  const newBookEntry = new Library();
  newBookEntry.displayLibrary();
});
