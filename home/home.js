import { loadFont } from '../js/loader.js';
import * as navbar from '../navbar/navbar.js';

var slide_index = 1;

function plusSlides(count) {
    showSlides(slide_index += count);
}

function setSlide(index) {
    showSlides(slide_index = index);
}

function showSlides(index) {
    var slides = document.getElementsByClassName('landing-slide');
    if (index > slides.length) {
        slide_index = 1;   
    }
    if (n < 1) {
        slide_index = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
}

function init() {
    navbar.init();

    loadFont('Inter', 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
        .catch((e) => console.error(e));

    document.addEventListener('DOMContentLoaded', () => {
        showSlides(slide_index);

    });
}

init();