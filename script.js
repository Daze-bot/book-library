let myLibrary = [];
let darkThemeBtn = document.querySelector('.darkTheme');
let lightThemeBtn = document.querySelector('.lightTheme');
let themeSelectLink = document.querySelector('#themeSelect');
let currentTheme = localStorage.getItem("theme") || "light";
let toTopBtn = document.querySelector('.toTop');
let newBookBtn = document.querySelector('.addBook');
let formBackground = document.querySelector('.newBookContainer');
let newBookForm = document.querySelector('.newBookForm');
let resetFormBtn = document.querySelector('.resetForm');
let formCloseBtn = document.querySelector('.formClose');

darkThemeBtn.addEventListener('click', () => setTheme("dark"));
lightThemeBtn.addEventListener('click', () => setTheme("light"));
window.addEventListener('scroll', showToTop);
toTopBtn.addEventListener('click', () => {window.scrollTo(0, 0)});
newBookBtn.addEventListener('click', showNewBookForm);
formCloseBtn.addEventListener('click', closeForm);

function showNewBookForm() {
  formBackground.classList.remove('hidden');
}

function addNewBook() {
  let titleInput = prompt("Title?");
  let authorInput = prompt("Author?");
  let pagesInput = prompt("Number of Pages?");
  let readInput = prompt("Have you read this book?");
  if (readInput === "yes") {
    readInput = true;
  } else {
    readInput = false;
  }
  let newBook = new Book(titleInput, authorInput, pagesInput, readInput);
  addToLibrary(newBook);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToLibrary(book) {
  myLibrary.push(book);
  createCard(book.title, book.author, book.pages, book.read);
}

function loopThroughLibrary(array) {
  for (let item of array) {
    createCard(item.title, item.author, item.pages, item.read);
  }
}

function createCard(title, author, pages, read) {
  let bookCardsContainer = document.querySelector('.bookCardsContainer');

  let bookCard = document.createElement('div')
  bookCard.classList.add('bookCard');

  let pTitle = document.createElement('p');
  pTitle.classList.add('bookTitle');
  let titleSpan = document.createElement('span');
  titleSpan.classList.add('title');
  let titleSpanText = document.createTextNode("Title: ");
  let titleText = document.createTextNode(`${title}`);

  let pAuthor = document.createElement('p');
  pAuthor.classList.add('bookAuthor');
  let authorSpan = document.createElement('span');
  authorSpan.classList.add('author');
  let authorSpanText = document.createTextNode("Author: ");
  let authorText = document.createTextNode(`${author}`);

  let pPages = document.createElement('p');
  pPages.classList.add('bookPages');
  let pagesSpan = document.createElement('span');
  pagesSpan.classList.add('pages');
  let pagesSpanText = document.createTextNode("# Pages: ");
  let pagesText = document.createTextNode(`${pages}`);

  let readStatus = document.createElement('div');
  readStatus.classList.add('bookReadStatus');
  let pRead = document.createElement('p');
  let pReadText = document.createTextNode("Mark as read:");
  let readBtn = document.createElement('button');
  readBtn.classList.add('readCheck');
  let checkMarkImg = document.createElement('img');
  checkMarkImg.classList.add('checkMark');
  checkMarkImg.setAttribute('src', './imgs/green-check.svg');
  checkMarkImg.setAttribute('alt', "Check Mark");

  let closeBtn = document.createElement('img');
  closeBtn.classList.add('closeButton');
  closeBtn.setAttribute('src', './imgs/close.svg');
  closeBtn.setAttribute('alt', "Close");

  if (read === true) {
    bookCard.classList.add('readBackground');
  } else if (read === false) {
    checkMarkImg.classList.add('hidden');
  }

  bookCardsContainer.appendChild(bookCard);
    bookCard.appendChild(pTitle);
      pTitle.appendChild(titleSpan);
        titleSpan.appendChild(titleSpanText);
      pTitle.appendChild(titleText);
    bookCard.appendChild(pAuthor);
      pAuthor.appendChild(authorSpan);
        authorSpan.appendChild(authorSpanText);
      pAuthor.appendChild(authorText);
    bookCard.appendChild(pPages);
      pPages.appendChild(pagesSpan);
        pagesSpan.appendChild(pagesSpanText);
      pPages.appendChild(pagesText);
    bookCard.appendChild(readStatus);
      readStatus.appendChild(pRead);
        pRead.appendChild(pReadText);
      readStatus.appendChild(readBtn);
        readBtn.appendChild(checkMarkImg);
    bookCard.appendChild(closeBtn);

    let readStatusBtns = document.querySelectorAll('.readCheck');
    readStatusBtns.forEach(readStatusBtn => readStatusBtn.addEventListener('click', markRead));
}

function markRead() {
  if (this.children[0].classList.contains('hidden')) {
    this.children[0].classList.remove('hidden');
    this.parentElement.parentElement.classList.add('readBackground');
  } else {
    this.children[0].classList.add('hidden');
    this.parentElement.parentElement.classList.remove('readBackground');
  }
}

function setTheme(themeName) {
  themeSelectLink.setAttribute('href', `./css/${themeName}.css`);
  window.localStorage.setItem("theme", `${themeName}`);
  if (themeName === "dark") {
    darkThemeBtn.classList.add('hidden');
    lightThemeBtn.classList.remove('hidden');
  } else {
    lightThemeBtn.classList.add('hidden');
    darkThemeBtn.classList.remove('hidden');
  }
}
setTheme(currentTheme);

function showToTop() {
  if (window.scrollY >= 210) {
    toTopBtn.classList.remove('hidden');
  } else {
    toTopBtn.classList.add('hidden');
  }
}

formBackground.addEventListener('click', function(e) {
  if (newBookForm.contains(e.target)) {
    return;
  } else {
    closeForm();
  }
})

function closeForm() {
  formBackground.classList.add('hidden');
  resetFormBtn.click();
}