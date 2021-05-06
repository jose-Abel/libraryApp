let library = [];

const Book = (title, author, numPages, read) => {
  const bookInfo = () => `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? 'read already' : 'not read yet'}`;

  return {
    title, author, numPages, read, bookInfo,
  };
};

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

  allChangeReadStatus.forEach((btn) => {
    btn.addEventListener('click', () => {
      const indexStr = btn.parentNode.id.slice(-1);

      const bookToChangeRead = library[parseInt(indexStr, 10)];

      bookToChangeRead.read = !bookToChangeRead.read;

      displayBooks();
    });
  });

  const allDeleteBook = document.querySelectorAll('.delete_book');

  allDeleteBook.forEach((btn) => {
    btn.addEventListener('click', () => {
      const indexStr = btn.parentNode.id.slice(-1);

      const bookToDeleteIndex = parseInt(indexStr, 10);

      library.splice(bookToDeleteIndex, 1);

      localStorage.removeItem('library');

      setLocalStorage();

      getLocalStorage();

      displayBooks();
    });
  });
}

function addBookToLibrary() {
  const bookTitle = document.getElementById('title').value;
  const authorName = document.getElementById('author').value;
  const pagesNumber = document.getElementById('pages').value;
  const haveReadIt = document.getElementById('read').checked;

  const newBook = Book(bookTitle, authorName, pagesNumber, haveReadIt);

  library.push(newBook);

  setLocalStorage();

  displayBooks();
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
