import * as navbar from '../navbar/navbar.js';

function registerTimer() {
    const f = function(value) {
        return `${String(value).padStart(2, '0')}`;
    }

    const eventDate = new Date('June 16, 2024 16:00:00').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();

        const timeDifference = eventDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.querySelector('.countdown-day').textContent = f(days);
        document.querySelector('.countdown-hour').textContent = f(hours);
        document.querySelector('.countdown-minute').textContent = f(minutes);
        document.querySelector('.countdown-second').textContent = f(seconds);

        if (timeDifference < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-wrapper').innerHTML = '<p>The event has started!</p>';
        }
    }, 1000);
}

function registerEvents() {
    
}

function init() {
    navbar.init();

    document.addEventListener('DOMContentLoaded', () => {
        registerEvents();
        registerTimer();
    });
}

init();