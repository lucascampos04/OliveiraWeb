const menuIcon = document.querySelector('.menu a');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', function() {
  menu.classList.toggle('open');
});
