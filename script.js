const langToggle = document.getElementById('langToggle');
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
let language = 'en';

function setLanguage(lang) {
  language = lang;
  document.querySelectorAll('[data-en][data-id]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.id;
  });
  langToggle.textContent = lang === 'en' ? 'ID' : 'EN';
  document.documentElement.lang = lang === 'en' ? 'en' : 'id';
  document.title = lang === 'en'
    ? 'Abdulhabib Hasibuan | Information Systems Graduate'
    : 'Abdulhabib Hasibuan | Lulusan Sistem Informasi';
}
langToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'id' : 'en'));
menu.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
