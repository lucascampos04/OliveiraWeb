document.addEventListener('DOMContentLoaded', function() {
    var exitButton = document.querySelector('.exit');
    var modal = document.querySelector('.modal');
    var alertInicial = document.querySelector('.alertInicial');
  
    exitButton.addEventListener('click', function() {
      modal.style.display = 'none';
      alertInicial.style.display = 'none';
    });
  
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        alertInicial.style.display = 'none';
      }
    });
  });

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');

let slideIndex = 0;

function moveCarousel() {
  slideIndex++;
  carousel.style.transform = `translateX(-${slideIndex * 100}%)`;

  if (slideIndex === slides.length) {
    slideIndex = 0;
  }
}

setInterval(moveCarousel, 2000);

  
  