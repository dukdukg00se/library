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

// function addBookToLibrary(bookObj) {
//   myLibrary.push(bookObj);
// }

function addBookToLibrary() {
  let myBook = new Book('IT', 'King', 500, true);
  myLibrary.push(myBook);
}


function displayBooks(arr) {
  const library = document.querySelector('#library');
  for (let i = 0; i < arr.length; i++) {
    let book = document.createElement('div');
    book.classList.add('book');

    let bookTitle = document.createElement('h2');
    bookTitle.classList.add('bookTitle');
    // bookTitle.textContent = arr[i].title;
    // book.appendChild(bookTitle);
    bookTitle.append(arr[i].title);


    let bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.append(arr[i].author);
  
    let bookPages = document.createElement('p');
    bookPages.classList.add('bookPages');
    bookPages.append(arr[i].pages);

    book.append(bookTitle, bookAuthor, bookPages);

    library.append(book);
  }
}

let black = new Book('black', 'x', 500, true);
addBookToLibrary(black);

// addBookToLibrary(new Book('Black', 'X', 500, true));

displayBooks(myLibrary);




