// HTML Loader
function loadHTML(url, targetElementId) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById(targetElementId).innerHTML = html;
                resolve();
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
                reject(error);
            });
    });
}

// CSS Loader
function loadCSS(url) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
        document.head.appendChild(link);
    });
}

// Script Loader
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true; // Load asynchronously to not block rendering
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.body.appendChild(script);
    });
}

// Font Loader
function loadFont(fontName, fontUrl) {
    return new Promise((resolve, reject) => {
        const fontFace = new FontFace(fontName, `url(${fontUrl})`);
        fontFace.load()
            .then(loadedFont => {
                document.fonts.add(loadedFont);
                resolve();
            })
            .catch(error => {
                console.error('Error loading font:', error);
                reject(error);
            });
    });
}

// Preconnect Loader for Google Fonts
function loadPreconnectTags() {
    const preconnectTags = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ];

    preconnectTags.forEach(tag => {
        const link = document.createElement('link');
        Object.entries(tag).forEach(([key, value]) => {
            link.setAttribute(key, value);
        });
        document.head.appendChild(link);
    });
}

// Usage example:
/*
Promise.all([
    loadHTML('path/to/html.html', 'targetElementId'),
    loadCSS('path/to/style.css'),
    loadScript('path/to/script.js'),
    loadFont('YourFontName', 'path/to/font.woff2')
])
.then(() => {
    console.log('All resources loaded successfully');
})
.catch(error => {
    console.error('Error loading resources:', error);
});
*/

export {
    loadHTML,
    loadCSS,
    loadScript,
    loadFont,
    loadPreconnectTags
};