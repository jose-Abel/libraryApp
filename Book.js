class Book {
    constructor(title, author, numPages, read) {
      this.title = title;
      this.author = author;
      this.numPages = numPages;
      this.read = read;
    }
  
    bookInfo() {
      console.log(`${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? 'read already' : 'not read yet'}`);
    }
}