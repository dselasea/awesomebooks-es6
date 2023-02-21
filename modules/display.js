const listOfbooks = document.querySelector('.books-content');
const newB = document.querySelector('.new-books');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

const showAlert = () => {
  const div = document.createElement('div');
  div.className = 'error';
  newB.appendChild(div);
  div.appendChild(document.createTextNode('Fields are required'));
  setTimeout(() => document.querySelector('.error').remove(), 3000);
};

const success = () => {
  const div = document.createElement('div');
  div.className = 'success';
  newB.append(div);
  div.appendChild(document.createTextNode('Book successfully added!'));
  setTimeout(() => document.querySelector('.success').remove(), 3000);
};

const removeSuccess = () => {
  const div = document.createElement('div');
  div.className = 'remove-book';
  newB.append(div);
  div.appendChild(document.createTextNode('Book Removed Successfully!'));
  setTimeout(() => document.querySelector('.remove-book').remove(), 3000);
};

// Display teh list of books on the web page
const DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = 'white';
  } else {
    bgcolor = 'light';
  }
  const displaybook = document.createElement('div');
  displaybook.classList.add('book-item');
  displaybook.classList.add(bgcolor);
  displaybook.setAttribute('id', index.bookid);
  displaybook.innerHTML = `<p class='book-title'>${index.title} by ${index.author}</p> `;
  const removeBook = document.createElement('button');
  removeBook.classList.add('btn');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  displaybook.appendChild(removeBook);
  listOfbooks.appendChild(displaybook);
};

class StoreBook {
  constructor() {
    // Array of objects for the book items
    this.BookData = [];
  }
  // Add new Book to the book list

  addBook(newbook) {
    this.BookData.push(newbook);
    localStorage.setItem('BookDB', JSON.stringify(this.BookData));
    DisplayBooks(newbook);
  }

  // Remove book from the list
  removeBook(bookid) {
    const rmvbook = document.getElementById(bookid);
    rmvbook.remove();
    this.BookData = this.BookData.filter((x) => x.bookid !== bookid);
    localStorage.setItem('BookDB', JSON.stringify(this.BookData));
    removeSuccess();
    if (this.BookData.length < 1) {
      listOfbooks.classList.add('no-border');
    }
  }
}

const savebook = new StoreBook();

// Get input value
const getformInput = () => {
  const insertbook = new Book(title.value, author.value);
  return insertbook;
};

// Add Button
const addnewBook = document.querySelector('#add');
addnewBook.addEventListener('click', (e) => {
  if (title.value === '' || author.value === '') {
    showAlert();
    e.preventDefault();
  } else {
    const item = getformInput();
    savebook.addBook(item);
    success();
    title.value = '';
    author.value = '';
    e.preventDefault();
  }
});

// display
window.addEventListener('DOMContentLoaded', () => {
  savebook.BookData = JSON.parse(localStorage.getItem('BookDB' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
});

setInterval(() => {
  const dateTimeNow = DateTime.now();
  document.querySelector('.date').innerHTML = dateTimeNow.toLocaleString(DateTime.DATETIME_MED);
}, 1000);