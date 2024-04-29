import { loadHTML, loadCSS, loadFont, loadPreconnectTags } from "../js/loader.js";

let active_navbar;

function handleEventListeners() {
    const onNavClick = function(e) {
        e.preventDefault();

        const navbarLink = e.target;

        active_navbar.classList.remove('navbar-link-active');
        navbarLink.classList.add('navbar-link-active');

        active_navbar = navbarLink;

        const targetId = this.getAttribute('href').substring(1); // Get target element id
        const targetElement = document.getElementById(targetId); // Get target element

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    const updateActiveNavbarLink = function() {
        // Get all navbar links
        const navbarLinks = document.querySelectorAll('.navbar-link');
        
        // Get the scroll position
        const scrollPosition = window.scrollY;

        // Loop through each section and find the one closest to the top of the viewport
        let closestSection = document.getElementById('container');
        let closestDistance = Infinity;
        document.querySelectorAll('div').forEach(section => {
            const distanceToTop = Math.abs(section.offsetTop - scrollPosition);
            if (distanceToTop < closestDistance) {
                closestDistance = distanceToTop;
                closestSection = section;
            }
        });

        // Remove navbar-link-active from all links
        navbarLinks.forEach(link => {
            link.classList.remove('navbar-link-active');
        });

        // Get the corresponding navbar link for the closest section
        const correspondingLink = document.querySelector(`.navbar-link[href="#${closestSection.id}"]`);
        if (correspondingLink) {
            correspondingLink.classList.add('navbar-link-active');
        }
    }
    
    Array.from(document.getElementsByClassName('navbar-link')).forEach((element) => {
        if (element.classList.contains('navbar-link-active')) active_navbar = element;
        element.addEventListener('click', onNavClick);
    });

    window.addEventListener('scroll', updateActiveNavbarLink);

    updateActiveNavbarLink();
}

function init() {
    const fonts = {
        'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;600;700&display=swap',
        'Workbench': 'https://fonts.googleapis.com/css2?family=Workbench&display=swap'
    }

    const css_links = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css',
        '../global.css',
        '../navbar/navbar.css'
    ]

    loadPreconnectTags();
    
    Array.from(fonts, (family, url) => {
        loadFont(family, url)
            .catch((e) => `Failed to load navbar font: ${console.error(e)}`);
    });

    css_links.forEach((url) => {
        loadCSS(url)
            .catch((e) => `Failed to load navbar css: ${console.error(e)}`);
    })

    document.addEventListener('DOMContentLoaded', () => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');

        if (!navbarPlaceholder) {
            console.error('Loaded navbar but the HTML tag navbar-placeholder is missing!');
            return;
        }

        loadHTML('../navbar/navbar.html', navbarPlaceholder.id)
            .then(() => {
                window.addEventListener('scroll', function() {
                    var navbar = document.getElementById('navbar-links');
                    var scrollPosition = window.scrollY;
                
                    if (scrollPosition > 10) {
                        navbar.classList.add('navbar-sticky');
                    } else {
                        navbar.classList.remove('navbar-sticky');
                    }
                });
        
                handleEventListeners();
            })
            .catch((e) => `Failed to load navbar html: ${console.error(e)}`);
    });
}

export { 
    init,
};