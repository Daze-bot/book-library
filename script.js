let darkThemeBtn = document.querySelector('.darkTheme');
let lightThemeBtn = document.querySelector('.lightTheme');
let themeSelectLink = document.querySelector('#themeSelect');
let currentTheme = localStorage.getItem("theme") || "light";
let toTopBtn = document.querySelector('.toTop');
let checkMark = document.querySelector('.checkMark');
let readStatusBtn = document.querySelector('.readCheck');
let bookCard = document.querySelector('.bookCard');

darkThemeBtn.addEventListener('click', () => setTheme("dark"));
lightThemeBtn.addEventListener('click', () => setTheme("light"));

window.addEventListener('scroll', showToTop);
toTopBtn.addEventListener('click', () => {window.scrollTo(0, 0)});

readStatusBtn.addEventListener('click', markRead);

function markRead() {
  if (checkMark.classList.contains('hidden')) {
    checkMark.classList.remove('hidden');
    bookCard.classList.add('readBackground');
  } else {
    checkMark.classList.add('hidden');
    bookCard.classList.remove('readBackground');
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