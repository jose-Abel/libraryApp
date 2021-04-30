
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

function addBookToLibrary() {
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

    console.log(library);
}