import { loadHTML, loadCSS, loadFont, loadPreconnectTags } from "../js/loader.js";

const config = {
    responsivePhoneWidth: 390
}

let active_navbar;

function handleResponsive() {
    const initPhone = function() {
        console.log('Phone detected!');

        Array.from(document.getElementsByClassName('navbar-link')).forEach((element) => {
            element.textContent = '';
            switch (element.getAttribute('id')) {
                case 'link-event':
                    element.innerHTML = '<i class="navbar-link-icon fa-regular fa-calendar-check"></i>';
                    break;
                case 'link-schedule':
                    element.innerHTML = '<i class="navbar-link-icon fa-brands fa-slack"></i>';
                    break;
                case 'link-home':
                    element.innerHTML = '<i class="navbar-link-icon fa-solid fa-house"></i>';
                    break;
                case 'link-ticket':
                    element.innerHTML = '<i class="navbar-link-icon fa-solid fa-ticket"></i>';
                    break;
                case 'link-booking':
                    element.innerHTML = '<i class="navbar-link-icon fa-solid fa-circle-plus"></i>';
                    break;
            }
        });
    };

    if (window.innerWidth <= config.responsivePhoneWidth) {
        initPhone();
        return;
    }
}

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

    const onToggleIconClick = function() {
        const toggleDiv = document.getElementById('navbar-toggle');
        const menu = document.getElementById('navbar-links');

        menu.classList.toggle('show-menu');
        toggleDiv.classList.toggle('show-icon');
    };

    Array.from(document.getElementsByClassName('navbar-toggle-icon'), (linkElement) => {
        linkElement.addEventListener('click', onToggleIconClick);
    });

    return;
    
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
        '../navbar/navbar.css',
        '../navbar/navbar-phone.css'
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
                    return;
                    var navbar = document.getElementById('navbar-links');
                    var scrollPosition = window.scrollY;
                
                    if (scrollPosition >= 100) {
                        navbar.classList.add('navbar-sticky');
                    } else {
                        navbar.classList.remove('navbar-sticky');
                    }
                });
        
                handleEventListeners();
                return;
                handleResponsive();
            })
            .catch((e) => `Failed to load navbar html: ${console.error(e)}`);
    });
}

export { 
    init,
};