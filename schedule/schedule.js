import * as navbar from '../navbar/navbar.js';

function registerEvents() {
    const onReadMore = function (event) {
        const hiddenElement = event.target.parentNode.parentNode.querySelector('.modal-hidden');

        if (hiddenElement.classList.contains('modal-hidden-active')) {
            hiddenElement.classList.remove('modal-hidden-active');
            event.target.textContent = 'More Info';
        } else {
            hiddenElement.classList.add('modal-hidden-active');
            event.target.textContent = 'Close';
        }
    };

    const onBook = function (event) {
        window.open('../booking-detail/booking-detail.html', '_self');
    };

    const buttons = document.querySelectorAll('.button-book');

    buttons.forEach((element) => {
       element.addEventListener('click', onBook); 
    });

    const readMoreElement = document.getElementsByClassName('modal');

    Array.from(readMoreElement).forEach((element) => {
        const modalButton = element.querySelector('.modal-button');

        modalButton.addEventListener('click', onReadMore);
    });
}

function init() {
    navbar.init();

    document.addEventListener('DOMContentLoaded', () => {
        registerEvents();
    });
}

const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let n = 3;

if (window.innerWidth <= 1024) n = 2;
if (window.innerWidth <= 768) n = 1;

function updateCarousel() {
    const cardWidth = carousel.clientWidth / n; // Display n cards at a time
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
updateCarousel(); // Initialize carousel position on load

init();