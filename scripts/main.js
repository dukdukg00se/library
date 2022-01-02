let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages}, ${read}`;
  };
}

function store(){
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");
  let myBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(myBook);

  // localStorage.setItem('libraryArray', myLibrary);
  // localStorage.setItem("title", title.value);
  // localStorage.setItem("author", author.value);
  // localStorage.setItem("pages", pages.value);
  // localStorage.setItem("read", read.checked);
}

function displayBooks() {
  let innerLibrary = document.createElement('div');
  innerLibrary.classList.add('inner-library');
  let outerLibrary = document.querySelector('#outer-library');

  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement('div');
    book.id = 'book' + i;
    book.classList.add('book');

    let closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.type = 'button';
    // Display special x symbol using hex code
    closeButton.textContent = '\xD7'; 

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
    innerLibrary.appendChild(book);
  }

  if (!!outerLibrary.firstElementChild) {
    let innerLibrary = document.querySelector('.inner-library');
    outerLibrary.removeChild(innerLibrary);
  }

  outerLibrary.appendChild(innerLibrary);
}

let modal = document.getElementById('modal');
let openModal = document.getElementById('open-modal');
openModal.addEventListener('click', () => {
  modal.style.display = 'block';
})

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
  store();
  displayBooks();
  
  let form = document.getElementById('modal-content');
  form.reset();

  modal.style.display = 'none';


});

let check = document.getElementById("test");
check.addEventListener('click', () => {
  console.log(localStorage);
})




