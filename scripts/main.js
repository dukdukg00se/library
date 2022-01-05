// Array to store books
let myLibrary = [];

// Constructor to create new book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages}, ${read}`;
  };
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
  // After user deletes a book the subcontainer is removed, book
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
    let bookTitle = document.createElement('h2');
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



    // Create p element to display if read 
    // let read = document.createElement('p');
    // read.classList.add('read');
    // read.textContent = myLibrary[i].read;

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
    // readBtn.textContent = myLibrary[i].read;

    

    // Add info to book card
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

function changeReadStatus() {
  let readBtn = document.querySelectorAll('.read-btn');
  readBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      // console.log(e.target.textContent);
      console.log(btn.id);

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
      // console.log(child.textContent);

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


let submit = document.getElementById("submit-btn");
submit.addEventListener('click', () => {
  // After clicking submit button:
  store(); // Create new book and add to myLibrary
  displayBooks(); // Display books in myLibrary
  close(); // Listen for close button click

  changeReadStatus();

  // Reset form and remove 
  let form = document.getElementById('modal-form');
  form.reset();
  modal.style.display = 'none';
});

// Remove modal or book cards
function close() {
  let closeBtns = document.querySelectorAll('.close-btn');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.id === 'close-modal') {
        let form = document.getElementById('modal-form');
        form.reset();
        modal.style.display = 'none';
      } else {
        let child = document.getElementById(e.target.id);
        let parent = child.parentNode;
        let grandParent = parent.parentNode;
        grandParent.removeChild(parent);

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

// Open modal to add new book
let openModal = document.getElementById('add-book');
openModal.addEventListener('click', () => {
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
});