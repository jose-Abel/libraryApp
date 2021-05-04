/* eslint-disable no-use-before-define */
/* eslint-disable func-names */

let library = [];

function Book({
  title, author, numPages, read,
}) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? 'read already' : 'not read yet'}`;
  };
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('library'));

  if (!data) return;

  library = data;
}

function setLocalStorage() {
  localStorage.setItem('library', JSON.stringify(library));
}

function displayAddBookForm() {
  const form = document.getElementById('form');

  form.classList.toggle('hide_element');
}

function displayBooks() {
  const divTable = document.getElementById('div_table');

  const tableElement = document.querySelector('.table');

  let markup = '';

  if (tableElement) {
    tableElement.parentNode.removeChild(tableElement);
  }

  if (library.length > 0) {
    markup += `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Pages</th>
            <th scope="col">Read?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < library.length; i += 1) {
      markup += `
        <tr>
            <th scope="row" class="num_index">${i + 1}</th>
            <td>${library[i].title}</td>
            <td>${library[i].author}</td>
            <td>${library[i].numPages}</td>
            <td>${library[i].read}</td>
            <td id="table_data_${i}">
                <button type="button" class="change_read btn btn-warning">Read?</button>
                <button type="button" class="delete_book btn btn-danger">Delete</button>
            </td>
        </tr>`;
    }

    markup += `</tbody>
        </table> `;
  }

  divTable.insertAdjacentHTML('beforeend', markup);

  const allChangeReadStatus = document.querySelectorAll('.change_read');

  addClickToEdit(allChangeReadStatus);

  const allDeleteBook = document.querySelectorAll('.delete_book');

  addClickToRemove(allDeleteBook);
}

function addBookToLibrary() {
  const bookTitle = document.getElementById('title').value;
  const authorName = document.getElementById('author').value;
  const pagesNumber = document.getElementById('pages').value;
  const haveReadIt = document.getElementById('read').checked;

  const newBook = new Book({
    title: bookTitle,
    author: authorName,
    numPages: pagesNumber,
    read: haveReadIt,
  });

  library.push(newBook);

  setLocalStorage();

  displayBooks();
}

function removeBookFromLibrary(element) {
  const indexStr = element.parentNode.id.slice(-1);

  const bookToDeleteIndex = parseInt(indexStr, 10);

  library.splice(bookToDeleteIndex, 1);

  localStorage.removeItem('library');

  setLocalStorage();

  getLocalStorage();

  displayBooks();
}

function editReadBook(element) {
  const indexStr = element.parentNode.id.slice(-1);

  const bookToChangeRead = library[parseInt(indexStr, 10)];

  bookToChangeRead.read = !bookToChangeRead.read;

  displayBooks();
}

function addClickToEdit(elements) {
  if (elements) {
    elements.forEach((btn) => {
      btn.addEventListener('click', function () {
        const element = this;
        editReadBook(element);
      });
    });
  }
}

function addClickToRemove(elements) {
  if (elements) {
    elements.forEach((btn) => {
      btn.addEventListener('click', function () {
        const element = this;
        removeBookFromLibrary(element);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bookForm = document.getElementById('displayBookForm');

  const submitForm = document.getElementById('submitForm');

  bookForm.addEventListener('click', (e) => {
    e.preventDefault();
    displayAddBookForm();
  });

  submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
  });

  getLocalStorage();
  displayBooks();
});
