(function() {
    function updateFavicon() {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = '/images/favicon.png';
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

    // Make both functions globally accessible for debugging
    window.updateFavicon = updateFavicon;
    window.removeSwaggerLogo = removeSwaggerLogo;

    // Execute on load and after short delays
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            updateFavicon();
            removeSwaggerLogo();
            setTimeout(removeSwaggerLogo, 100);
            setTimeout(removeSwaggerLogo, 500);
        });
    } else {
        updateFavicon();
        removeSwaggerLogo();
        setTimeout(removeSwaggerLogo, 100);
        setTimeout(removeSwaggerLogo, 500);
    }
})();
