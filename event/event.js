import * as navbar from '../navbar/navbar.js';

function registerEvents() {
    const onBookClick = function () {
        window.open('../booking-detail/booking-detail.html', '_self');
    };

    const buttons = document.querySelectorAll('.event-modal-button');

    buttons.forEach((element) => {
        element.addEventListener('click', onBookClick);
    });
}

function init() {
    navbar.init();

    registerEvents();
}

const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

let n = 3;

if (window.innerWidth <= 1024) n = 2;
if (window.innerWidth <= 768) n = 1;

function updateCarousel() {
    const cardWidth = carousel.clientWidth / n; // Display 3 cards at a time
    carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < carousel.children.length - n) { // Adjust for number of visible cards
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

init();