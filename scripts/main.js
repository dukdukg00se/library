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

function displayBooks() {
  let librarySubcontainer = document.createElement('div');
  librarySubcontainer.classList.add('library-subcontainer');
  let library = document.getElementById('library');

  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement('div');
    book.id = 'book' + i;
    book.classList.add('book');

    let closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.type = 'button';
    closeButton.id = 'close-btn' + i;
    closeButton.setAttribute('data-value', myLibrary[i].title);

    closeButton.textContent = '\xD7'; // Display special x symbol using hex code

    let bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = myLibrary[i].title;

    let bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = myLibrary[i].author;

    let bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.textContent = myLibrary[i].pages;

    let read = document.createElement('p');
    read.classList.add('read');
    read.textContent = myLibrary[i].read;

    book.append(closeButton, bookTitle, bookAuthor, bookPages, read);
    librarySubcontainer.appendChild(book);
  }

  if (!!library.firstElementChild) {
    let librarySubcontainer = document.querySelector('.library-subcontainer');
    library.removeChild(librarySubcontainer);
  }
  library.appendChild(librarySubcontainer);

  close();
  // let closeWin = document.querySelectorAll('.close');
  // closeWin.forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     // console.log(e.target.id);
  //     let childNode = document.getElementById(e.target.id);
  //     // console.log(childNode.parentNode);
  //     let parent = childNode.parentNode;
  //     // console.log(parent.getAttribute('data-nmbr'));
  //     // console.log(parent.parentNode);
  //     let grandParent = parent.parentNode;
  //     grandParent.removeChild(parent);

  //     myLibrary.splice(parent.getAttribute('data-nmbr'), 1);
    
  //   });
  // });
}

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
  store();
  displayBooks();
  
  let form = document.getElementById('modal-content');
  form.reset();
  modal.style.display = 'none';

  // let closeWin = document.querySelectorAll('.close');
  // closeWin.forEach((btn) => {
  // btn.addEventListener('click', () => {
  //   console.log(btn.className);
  //   });
  // });
});

function close() {
  let closeBtns = document.querySelectorAll('.close');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {

      if (e.target.id === 'close-modal') {
        let form = document.getElementById('modal-content');
        form.reset();
        modal.style.display = 'none';
      } else {
        let child = document.getElementById(e.target.id);
        let parent = child.parentNode;
        let grandParent = parent.parentNode;
        grandParent.removeChild(parent);

        for (let i = 0; i < myLibrary.length; i++) {
          console.log(myLibrary[i].title, child.getAttribute('data-value'));
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

let modal = document.getElementById('modal');
let openModal = document.getElementById('open-modal');
openModal.addEventListener('click', () => {
  modal.style.display = 'block';
});