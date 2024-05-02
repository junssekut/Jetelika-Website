import { loadFont } from '../js/loader.js';
import * as navbar from '../navbar/navbar.js';

function init() {
    navbar.init();

    loadFont('Inter', 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
        .catch((e) => console.error(e));
}

init();