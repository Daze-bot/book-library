let darkThemeBtn = document.querySelector('.darkTheme');
let lightThemeBtn = document.querySelector('.lightTheme');
let themeSelectLink = document.querySelector('#themeSelect');
let currentTheme = localStorage.getItem("theme") || "light";
let toTopBtn = document.querySelector('.toTop');
let readStatusBtns = document.querySelectorAll('.readCheck');
let bookCardsContainer = document.querySelector('.bookCardsContainer');
let newBookBtn = document.querySelector('.addBook');

let myLibrary = [];

darkThemeBtn.addEventListener('click', () => setTheme("dark"));
lightThemeBtn.addEventListener('click', () => setTheme("light"));

window.addEventListener('scroll', showToTop);
toTopBtn.addEventListener('click', () => {window.scrollTo(0, 0)});

readStatusBtns.forEach(readStatusBtn => readStatusBtn.addEventListener('click', markRead));

newBookBtn.addEventListener('click', addNewBook);

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
  console.log(myLibrary);
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

function showToTop() {
  if (window.scrollY >= 210) {
    toTopBtn.classList.remove('hidden');
  } else {
    toTopBtn.classList.add('hidden');
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