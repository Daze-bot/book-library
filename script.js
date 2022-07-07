let darkThemeBtn = document.querySelector('.darkTheme');
let lightThemeBtn = document.querySelector('.lightTheme');
let themeSelectLink = document.querySelector('#themeSelect');
let currentTheme = localStorage.getItem("theme") || "light";
let toTopBtn = document.querySelector('.toTop');
let readStatusBtns = document.querySelectorAll('.readCheck');

darkThemeBtn.addEventListener('click', () => setTheme("dark"));
lightThemeBtn.addEventListener('click', () => setTheme("light"));

window.addEventListener('scroll', showToTop);
toTopBtn.addEventListener('click', () => {window.scrollTo(0, 0)});

readStatusBtns.forEach(readStatusBtn => readStatusBtn.addEventListener('click', markRead))

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