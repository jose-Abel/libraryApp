let library = [];

function Book({title, author, numPages, read}) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? "read already" : "not read yet"}`;
    }
}

function displayAddBookForm() {
    const form = document.getElementById("form");

    form.classList.toggle("hide_element");
}

function addBookToLibrary(e) {
    let bookTitle = document.getElementById("title").value;
    let authorName = document.getElementById("author").value;
    let pagesNumber = document.getElementById("pages").value;
    let haveReadIt = document.getElementById("read").checked;

    let newBook = new Book({
        title: bookTitle, 
        author: authorName, 
        numPages: pagesNumber, 
        read: haveReadIt
    });

    library.push(newBook);

    setLocalStorage();

    displayBooks()
}

function removeBookFromLibrary(element) {
    const indexStr = element.parentNode.id.slice(-1);
    
    let bookToDeleteIndex = parseInt(indexStr);
    
    library.splice(bookToDeleteIndex, 1);

    localStorage.removeItem("library");

    setLocalStorage();

    getLocalStorage();

    displayBooks();
}

function editReadBook(element) {
    const indexStr = element.parentNode.id.slice(-1);
    
    let bookToChangeRead = library[parseInt(indexStr)];
    
    bookToChangeRead.read = !bookToChangeRead.read;

    displayBooks();
}

function displayBooks() {
    const divTable = document.getElementById("div_table");

    const tableElement = document.querySelector(".table");
    
    let markup = "";

    if(tableElement) {
        tableElement.parentNode.removeChild(tableElement);
    }

    if(library.length > 0){
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
        <tbody>`


      for(let i = 0; i < library.length; i++) {
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
        </tr>`
        }

        markup += `</tbody>
        </table> `
    }

    divTable.insertAdjacentHTML("beforeend", markup);

    const allChangeReadStatus = document.querySelectorAll(".change_read");
    const allDeleteBook = document.querySelectorAll(".delete_book");

    if(allChangeReadStatus){
        allChangeReadStatus.forEach(btn => {
            btn.addEventListener("click", function() {
                let element = this;
                editReadBook(element);
            });
        })
    }

    if(allDeleteBook){
        allDeleteBook.forEach(btn => {
            btn.addEventListener("click", function() {
                let element = this;
                removeBookFromLibrary(element);
            });
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById("displayBookForm")

    const submitForm = document.getElementById("submitForm")

    bookForm.addEventListener("click", function(e) {
        e.preventDefault();
        displayAddBookForm()
    });

    submitForm.addEventListener("click", function(e){
        e.preventDefault();
        addBookToLibrary();
    });

    getLocalStorage();
    displayBooks();
});


function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('library'))

    if(!data) return;

    library = data;
}

function setLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}
