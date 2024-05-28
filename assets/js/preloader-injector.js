import { loadCSS } from './loader.js';

function init() {
    loadCSS('../assets/css/preloader.css').catch((e) => console.error(e));
    loadCSS('../assets/css/scrollbar.css').catch((e) => console.error(e));

    var preloaderElement = document.getElementById('preloader');
    preloaderElement = document.createElement('div');
    preloaderElement.classList.add('preloader-placeholder');
    preloaderElement.id = 'preloader';

    document.body.insertBefore(preloaderElement, document.body.firstChild);

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloaderElement.style.opacity = 0;

            setTimeout(function() {
                preloaderElement.style.display = 'none';
            }, 300);
        }, 2000);

    });
}

init();