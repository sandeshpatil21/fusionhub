(function() {
    function updateFavicon() {
        // Remove any existing favicon links
        const existingLinks = document.querySelectorAll("link[rel*='icon']");
        existingLinks.forEach(link => link.remove());

        // Create new favicon link
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = '/images/favicon.png?v=' + new Date().getTime();
        document.head.appendChild(link);
    }

    function updateTitle() {
        document.title = 'FusionHub API';
    }

    function removeSwaggerLogo() {
        const swaggerImages = document.querySelectorAll('.swagger-ui img, .topbar img, .link img');
        const topbarLinks = document.querySelectorAll('.swagger-ui .topbar .link');
        
        swaggerImages.forEach(img => {
            if (img.src.includes('swagger')) {
                img.parentElement.remove();
            }
        });
        
        topbarLinks.forEach(link => link.remove());
    }

    // Make functions globally accessible for debugging
    window.updateFavicon = updateFavicon;
    window.updateTitle = updateTitle;
    window.removeSwaggerLogo = removeSwaggerLogo;

    // Execute on load and after delays to ensure changes stick
    function applyChanges() {
        updateFavicon();
        updateTitle();
        removeSwaggerLogo();
    }

    // Run immediately
    applyChanges();

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyChanges);
    }

    // Run multiple times to ensure changes stick
    [100, 500, 1000, 2000].forEach(delay => {
        setTimeout(applyChanges, delay);
    });

    // Also run when the URL changes (for single-page-app behavior)
    window.addEventListener('popstate', applyChanges);
})();
