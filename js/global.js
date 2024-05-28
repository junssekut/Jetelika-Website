function jgoto(url, self = true) {
    window.open(url, self ? '_self' : '_blank');
}

function registerButtons() {
    const buttons = document.querySelectorAll(['[jhref]']);

    Array.from(buttons).forEach((element) => {
        if (element.getAttribute('jhref-registered')) return;

        element.addEventListener('click', () => jgoto(element.getAttribute('jhref')));
        element.setAttribute('jhref-registered', true);
    });
}

export {
    jgoto,
    registerButtons
}