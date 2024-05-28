import { loadFont } from '../js/loader.js';
import * as navbar from '../navbar/navbar.js';
import { registerButtons } from '../js/global.js';

function init() {
    navbar.init();
    
    document.addEventListener('DOMContentLoaded', () => {
        registerButtons();
    });
}

init();