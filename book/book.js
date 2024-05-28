import * as navbar from '../navbar/navbar.js';

function registerEvents() {
    const onBookingClick = function (element) {
        window.open('../booking-detail/booking-detail.html', '_self');
    };

    const onIconClick = function (element) {
        document.getElementById('suitable-package').scrollIntoView();
    };

    document.querySelectorAll('.card-button-book').forEach((element) => {
        element.addEventListener('click', onBookingClick);
    });

    // document.getElementById('icon-arrow-down').addEventListener('click', onIconClick);
}

function init() {
    navbar.init();

    document.addEventListener('DOMContentLoaded', () => {
        const icons = document.querySelectorAll('.card-benefit-icon');
    
        icons.forEach(icon => {
            const randomDelay = Math.random() * 0.5; // Random delay between 0 and 2 seconds
            icon.style.animationDelay = `${randomDelay}s`;
        });

        registerEvents();
    });
}

init();