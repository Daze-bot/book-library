let myLibrary = JSON.parse(localStorage.getItem("library") || "[]");
let uniqueID = +localStorage.getItem("uniqueID") || 0;
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
let formSubmitBtn = document.querySelector('.submitNewBook');
let searchBar = document.querySelector('#searchbar');

window.addEventListener('load', () => loadLibrary(myLibrary));
darkThemeBtn.addEventListener('click', () => setTheme("dark"));
lightThemeBtn.addEventListener('click', () => setTheme("light"));
window.addEventListener('scroll', showToTop);
toTopBtn.addEventListener('click', () => {window.scrollTo(0, 0)});
newBookBtn.addEventListener('click', showNewBookForm);
formCloseBtn.addEventListener('click', closeForm);
formSubmitBtn.addEventListener('click', addNewBook);
searchBar.addEventListener('keyup', () => filterBySearch(searchBar.value));
searchBar.addEventListener('focusin', showCancel);
searchBar.addEventListener('focusout', hideCancel);

function showNewBookForm() {
  formBackground.classList.remove('hidden');
}

function addNewBook() {
  let titleInput = document.querySelector('#bookTitleInput').value;
  let authorInput = document.querySelector('#bookAuthorInput').value;
  let pagesInput = document.querySelector('#bookPagesInput').value;
  let readInput = document.querySelector('#bookReadInput').checked.toString();
  uniqueID += 1;

  let newBook = new Book(titleInput, authorInput, pagesInput, readInput, uniqueID);
  addToLibrary(newBook);
}

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addToLibrary(book) {
  myLibrary.push(book);
  saveLibrary();
  saveUniqueID();
  createCard(book.title, book.author, book.pages, book.read, book.id);
}

function clearAndLoopThroughLibrary(array) {
  let bookCardsContainer = document.querySelector('.bookCardsContainer');
  while (bookCardsContainer.hasChildNodes()) {
    bookCardsContainer.removeChild(bookCardsContainer.lastChild);
  }
  loadLibrary(array);
}

function loadLibrary(array) {
  for (let item of array) {
    createCard(item.title, item.author, item.pages, item.read, item.id);
  }
}

function createCard(title, author, pages, read, id) {
  let bookCardsContainer = document.querySelector('.bookCardsContainer');

  let bookCard = document.createElement('div')
  bookCard.classList.add('bookCard');
  bookCard.dataset.id = `${id}`;

  let pTitle = document.createElement('a');
  pTitle.classList.add('bookTitle');
  pTitle.setAttribute('href', `https://www.thriftbooks.com/browse/?b.search=${title}`);
  pTitle.setAttribute('target', "_blank");
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
  closeBtn.classList.add('cardClose');
  closeBtn.setAttribute('src', './imgs/close.svg');
  closeBtn.setAttribute('alt', "Close");

  if (read === "true") {
    bookCard.classList.add('readBackground');
  } else if (read === "false") {
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

    let cardRemoveBtns = document.querySelectorAll('.cardClose');
    cardRemoveBtns.forEach(cardRemoveBtn => cardRemoveBtn.addEventListener('click', removeCard));

    closeForm();
}

function filterBySearch(search) {
  let filteredLibrary = myLibrary.filter(library => {
    return (library.title.toUpperCase().includes(search.toUpperCase()) || 
        library.author.toUpperCase().includes(search.toUpperCase()));
  })
  clearAndLoopThroughLibrary(filteredLibrary);
}

function markRead() {
  let bookID = +this.parentElement.parentElement.dataset.id;
  let index = myLibrary.findIndex(x => x.id === bookID);
  if (this.children[0].classList.contains('hidden')) {
    this.children[0].classList.remove('hidden');
    this.parentElement.parentElement.classList.add('readBackground');
    myLibrary[index].read = "true";
  } else {
    this.children[0].classList.add('hidden');
    this.parentElement.parentElement.classList.remove('readBackground');
    myLibrary[index].read = "false";
  }
  saveLibrary();
}

function removeCard() {
  if (confirm("Are you sure you want to remove this book?")) {
    this.parentElement.remove();
    let bookID = +this.parentElement.dataset.id;
    let index = myLibrary.findIndex(x => x.id === bookID);
    myLibrary.splice(index, 1);
    saveLibrary();
  } else {
    return;
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

function saveLibrary() {
  window.localStorage.setItem("library", JSON.stringify(myLibrary));
}

function saveUniqueID() {
  window.localStorage.setItem("uniqueID", uniqueID);
}

function showCancel() {
  let searchCancel = document.querySelector('.searchCancel');
  searchCancel.classList.remove('hidden');
}

function hideCancel() {
  let searchCancel = document.querySelector('.searchCancel');
  searchCancel.classList.add('hidden');
}