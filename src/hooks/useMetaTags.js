import { useEffect } from 'react';

const useMetaTags = (seoData) => {
    useEffect(() => {
        if (!seoData) return;
        const { title, description, keywords, canonicalUrl, robotsTag, ogImage } = seoData;

        // Title
        if (title) document.title = title;

        // Meta Tags Helper
        const updateOrCreateMeta = (name, content, attr = 'name') => {
            if (!content) return;
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (el) {
                el.setAttribute('content', content);
            } else {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                el.setAttribute('content', content);
                document.head.appendChild(el);
            }
        };

        // Standard Meta
        updateOrCreateMeta('description', description);
        updateOrCreateMeta('keywords', keywords);
        updateOrCreateMeta('robots', robotsTag);

        // Open Graph
        updateOrCreateMeta('og:title', title, 'property');
        updateOrCreateMeta('og:description', description, 'property');
        updateOrCreateMeta('og:image', ogImage, 'property');
        updateOrCreateMeta('og:type', 'website', 'property');

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonicalUrl) {
            if (canonical) {
                canonical.setAttribute('href', canonicalUrl);
            } else {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                canonical.href = canonicalUrl;
                document.head.appendChild(canonical);
            }
        }
    }, [seoData]);
};

export default useMetaTags;
