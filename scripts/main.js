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
    book.setAttribute('data-nmbr', i);

    let closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.type = 'button';

    closeButton.id = myLibrary[i].title

    // closeButton.id = 'close' + i;
    closeButton.setAttribute('data-nmbr', i);
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

  // CURRENTLY WORKING ON THIS FUNCTION BELOW
  // let closeWin = document.querySelectorAll('.close');
  // closeWin.forEach((btn) => {
  // btn.addEventListener('click', () => {
  //   console.log(btn.className);
  //   });
  // });
});

// CURRENTLY WORKING ON THIS FUNCTION BELOW
// let closeWin = document.querySelectorAll('.close');
// closeWin.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     // console.log(e);

//     if (e.target.id === 'close-modal') {
//       console.log(e);
//       let form = document.getElementById('modal-content');
//       form.reset();
//       modal.style.display = 'none';
//     } else {

//     }
//   });
// });

function close() {
  let closeBtns = document.querySelectorAll('.close');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // console.log(e.target.id);
      if (e.target.id === 'close-modal') {
        let form = document.getElementById('modal-content');
        form.reset();
        modal.style.display = 'none';
      } else {
        let child = document.getElementById(e.target.id);
        let parent = child.parentNode;
        let grandParent = parent.parentNode;
        grandParent.removeChild(parent);

        console.log(child.getAttribute('id'));
        // delete myLibrary[parent.getAttribute('data-nmbr')];



        console.log(myLibrary);

        for (let i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].title === child.getAttribute('id')) {
            delete myLibrary[i];
            myLibrary = myLibrary.filter((obj) => obj !== undefined);
          }
        }

        // myLibrary.splice(parent.getAttribute('data-nmbr'), 1);
        // console.log(parent.getAttribute('data-nmbr'));
      }
      // console.log(myLibrary, myLibrary.length);  

    });
  });
}

close();







let modal = document.getElementById('modal');
let openModal = document.getElementById('open-modal');
openModal.addEventListener('click', () => {
  modal.style.display = 'block';
});

// let closeWin = document.querySelector('.close');
// closeWin.addEventListener('click', () => {
//   console.log('test');
// })


// const buttons = document.querySelectorAll('button');
// buttons.forEach((button) => {
//   button.addEventListener('click', () => {
//     console.log(button.id);
//   });
// });

// window.addEventListener('click', test());




