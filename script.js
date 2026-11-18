const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The theme and language controls still work for the current page.
  }
}

let language = safeStorageGet('portfolio-language') || 'en';

function setLanguage(lang) {
  language = lang === 'id' ? 'id' : 'en';
  document.querySelectorAll('[data-en][data-id]').forEach((element) => {
    element.textContent = language === 'en' ? element.dataset.en : element.dataset.id;
  });

  langToggle.textContent = language === 'en' ? 'ID' : 'EN';
  langToggle.setAttribute(
    'aria-label',
    language === 'en' ? 'Switch to Indonesian' : 'Switch to English'
  );
  document.documentElement.lang = language;
  document.title = language === 'en'
    ? 'Abdulhabib Hasibuan | Information Systems Graduate'
    : 'Abdulhabib Hasibuan | Lulusan Sistem Informasi';
  safeStorageSet('portfolio-language', language);
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'Activate light mode' : 'Activate dark mode'
  );
  themeToggle.title = isDark ? 'Activate light mode' : 'Activate dark mode';
  safeStorageSet('portfolio-theme', isDark ? 'dark' : 'light');
  safeStorageSet('theme', isDark ? 'dark' : 'light');
}

function closeMenu() {
  navLinks.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
}

langToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'id' : 'en'));
themeToggle.addEventListener('click', () => {
  setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
});
menu.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});

setLanguage(language);
setTheme(safeStorageGet('portfolio-theme') || safeStorageGet('theme') || 'light');
