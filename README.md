![](https://img.shields.io/badge/Microverse-blueviolet)

# Library App

The Microverse Library v1.1 project for Javascript module that consists of extending the ‘Book’ example from a previous lesson and turn it into a small Library app.

In this implementation, I create the Book function constructor creates new instances of books objects. 

The function displayAddBookForm toggles the form inputs to add new books, by getting attach an event listener when the DOM is loaded through the DOMContentLoaded event listener. 

The function addBookToLibrary, that is called through an on click event listener, consist of adding the book to the library array and to the local storage in the browser and call the displayBooks function that write the markup for the table in the HTML. 

Finally the table itself has 2 buttons that gets attach event listeners on those buttons, the edit and the delete buttons. To the delete button an on click event listener calls the function removeBookFromLibrary and to the edit button an on click event listener calls the editReadBook function. 

Finally the getLocalStorage and setLocalStorage functions are in charge of the behaviour implies by it's respective names.

## Built With
- Javascript


## Author
- 👤GitHub: [Jose Abel Ramirez](https://github.com/jose-Abel)
- Linkedin: [Jose Abel Ramirez Frontany](https://www.linkedin.com/in/jose-abel-ramirez-frontany-7674a842/)

## Getting Started
In order to run locally this project type the following commands over the terminal in Linux or Mac or the Windows cmd console, install the live-server first:

- npm -g live-server
- git clone https://github.com/guillainbisimwa/Private_Events.git
- cd libraryApp
- live-server

## Run linters
For the linters, this tests runs once you make a PR, if you have it in the respective folder. In order to have this tests, after cloning this project:

 - cd libraryApp
- From the root of this project create the folders .github/workflows
- Add a copy of [.github/workflows/linters.yml](https://github.com/microverseinc/linters-config/blob/master/javascript/.github/workflows/linters.yml) to the .github/workflows


### Acknowledgments
A special acknowledgment and appreciation to Microverse for helping me gaining new knowledge as a software developer.


## 📝 License
This project is MIT licensed.