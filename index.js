document.addEventListener('DOMContentLoaded', () => {
  const app = new App();

  const bookForm = document.getElementById('displayBookForm');

  const submitForm = document.getElementById('submitForm');

  bookForm.addEventListener('click', (e) => {
    e.preventDefault();
    app.displayAddBookForm();
  });

  submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    app.addBookToLibrary();
  });

  app.getLocalStorage();
  app.displayBooks();
});
