// Array to store books
let myLibrary = [];

// Constructor to create new book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = function() {
  //   return `${title} by ${author}, ${pages}, ${read}`;
  // };
}

// Create new book from form input and store in myLibrary
function store(){
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");
  let myBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(myBook);
}

// Iterate through myLibrary array and display each book
function displayBooks() {
  // Create a subcontainer to append books to
  // After user deletes a book, subcontainer removed, book
  // deleted from array and array displayed again
  let librarySubcontainer = document.createElement('div');
  librarySubcontainer.classList.add('library-subcontainer');
  let library = document.getElementById('library');

  // Iterate myLibrary, creating a card with input info for each book
  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement('div');
    book.id = 'book-' + i;
    book.classList.add('book');
    // Create close button
    let closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.type = 'button';
    closeBtn.id = 'close-btn-' + i; // id used in close function
    closeBtn.setAttribute('data-value', myLibrary[i].title);
    closeBtn.textContent = '\xD7'; // Display special x symbol using hex code
    // Create book title header
    let bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = myLibrary[i].title;
    // Create p element with author info
    let bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = myLibrary[i].author;
    // Create p element with book page length
    let bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.textContent = myLibrary[i].pages + ' pages';
    // Create button to display/change read status
    let readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    readBtn.type = 'button';
    readBtn.id = 'read-btn-' + i;
    readBtn.setAttribute('data-value', myLibrary[i].title);
    if (myLibrary[i].read) {
      readBtn.textContent = 'Read';
    } else {
      readBtn.textContent = "Not Read";
    }    
    // Add elements to book card
    book.append(closeBtn, bookTitle, bookAuthor, bookPages, readBtn);
    // Append book card to subcontainer
    librarySubcontainer.appendChild(book);
  }
  // If library is already displaying books then remove existing cards by removing subcontainer
  if (!!library.firstElementChild) {
    let librarySubcontainer = document.querySelector('.library-subcontainer');
    library.removeChild(librarySubcontainer);
  }
  // Display books by appending subcontainer to library
  library.appendChild(librarySubcontainer);
}

// Change read status of book card
function changeReadStatus() {
  let readBtn = document.querySelectorAll('.read-btn');
  readBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      // console.log(e.target.textContent);
      // console.log(btn.id);
      // Changes textContent but reverts back when adding a new card
      // need to update read status in myLibrary array
      // if (e.target.textContent === 'Not Read') {
      //   e.target.textContent = 'Read';
      // }
      // Also can use btn.textContent
      // if (btn.textContent === 'Not Read') {
      //   btn.textContent = 'Read';
      // } 
      
      let child = document.getElementById(btn.id);
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === child.getAttribute('data-value')) {
          if (child.textContent === 'Not Read') {
            myLibrary[i].read = true;
            child.textContent = 'Read';
          } else {
            myLibrary[i].read = false;
            child.textContent = 'Not Read';
          }
        }
      }
    });
  });
}

// Remove modal or book cards
function close() {
  let closeBtns = document.querySelectorAll('.close-btn');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Remove from DOM
      if (e.target.id === 'close-modal') {

       


        let form = document.getElementById('modal-form');
        form.reset();
        modal.style.display = 'none';


        let errMsg= document.querySelector('.error-msg');
        if (errMsg !== null) {
          form.removeChild(errMsg);
        }



      } else {
        let child = document.getElementById(e.target.id);
        let parent = child.parentNode;
        let grandParent = parent.parentNode;
        grandParent.removeChild(parent);
        // Remove from myLibrary array
        for (let i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].title === child.getAttribute('data-value')) {
            delete myLibrary[i];
            myLibrary = myLibrary.filter((obj) => obj !== undefined);
          }
        }
      }
    });
  });
}
close();


let submit = document.getElementById("submit-btn");
submit.addEventListener('click', () => {
  let title = document.getElementById('title');



  let form = document.getElementById('modal-form');
  let errMsg = document.querySelector('.error-msg');
  

  if (!title.value) {
    if (errMsg === null) {
      let errMsg = document.createElement('p');
      errMsg.classList.add('error-msg')
      errMsg.textContent = 'Please add a book title';
      form.insertBefore(errMsg, title);
    } else {
      errMsg.textContent = 'Please add book title';
    }
  } else if (!myLibrary.every((book) => book.title !== title.value)) {
    if (errMsg === null) {
      let errMsg = document.createElement('p');
      errMsg.classList.add('error-msg')
      errMsg.textContent = 'Book already exists in library';
      form.insertBefore(errMsg, title);
    } else {
      errMsg.textContent = 'Book already exists in library';
    } 
  } else {
    if (errMsg !== null) {
      form.removeChild(errMsg);
    }
    
    

    store(); 
    displayBooks(); 
    changeReadStatus(); 
    close(); 
  
    // Reset form and remove 
    
  
  
    
    modal.style.display = 'none';
    form.reset();
  }


});

// Open modal to add new book
let openModal = document.getElementById('add-book');
openModal.addEventListener('click', () => {
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
});