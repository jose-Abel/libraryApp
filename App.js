class App {
    library = [];
  
    getLocalStorage() {
      const data = JSON.parse(localStorage.getItem('library'));
  
      if (!data) return;
  
      this.library = data;
    }
  
    _setLocalStorage() {
      localStorage.setItem('library', JSON.stringify(this.library));
    }
  
    displayAddBookForm() {
      const form = document.getElementById('form');
  
      form.classList.toggle('hide_element');
    }
  
    displayBooks() {
      const divTable = document.getElementById('div_table');
      const tableElement = document.querySelector('.table');
      let markup = '';
  
      if (tableElement) {
        tableElement.parentNode.removeChild(tableElement);
      }
  
      if (this.library.length > 0) {
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
  
        for (let i = 0; i < this.library.length; i += 1) {
          markup += `
          <tr>
              <th scope="row" class="num_index">${i + 1}</th>
              <td>${this.library[i].title}</td>
              <td>${this.library[i].author}</td>
              <td>${this.library[i].numPages}</td>
              <td>${this.library[i].read}</td>
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
  
          const bookToChangeRead = this.library[parseInt(indexStr, 10)];
  
          bookToChangeRead.read = !bookToChangeRead.read;
  
          this.displayBooks();
        });
      });
  
      const allDeleteBook = document.querySelectorAll('.delete_book');
  
      allDeleteBook.forEach((btn) => {
        btn.addEventListener('click', () => {
          const indexStr = btn.parentNode.id.slice(-1);
  
          const bookToDeleteIndex = parseInt(indexStr, 10);
  
          this.library.splice(bookToDeleteIndex, 1);
  
          localStorage.removeItem('library');
  
          this._setLocalStorage();
  
          this.getLocalStorage();
  
          this.displayBooks();
        });
      });
    }
  
    addBookToLibrary() {
      const bookTitle = document.getElementById('title').value;
      const authorName = document.getElementById('author').value;
      const pagesNumber = document.getElementById('pages').value;
      const haveReadIt = document.getElementById('read').checked;
  
      const newBook = new Book(bookTitle, authorName, pagesNumber, haveReadIt);
  
      this.library.push(newBook);
  
      this._setLocalStorage();
  
      this.displayBooks();
    }
}
