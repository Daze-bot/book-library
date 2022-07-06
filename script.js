let darkThemeBtn = document.querySelector('.darkTheme');
let lightThemeBtn = document.querySelector('.lightTheme');
let themeSelectLink = document.querySelector('#themeSelect');
let currentTheme = localStorage.getItem("theme") || "light";

darkThemeBtn.addEventListener('click', () => setTheme("dark"));
lightThemeBtn.addEventListener('click', () => setTheme("light"));

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