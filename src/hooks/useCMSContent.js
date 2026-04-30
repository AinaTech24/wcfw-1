import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Fix relative URLs in HTML content.
 * When CMS editors insert links like "www.example.com" without a protocol,
 * the browser treats them as relative paths (e.g., /about/legacy/www.example.com).
 * This function ensures all <a href="..."> values have a proper protocol prefix.
 */
const fixRelativeUrls = (html) => {
    if (typeof html !== 'string') return html;
    // Match href="..." where the URL doesn't start with http://, https://, mailto:, tel:, #, or /
    return html.replace(
        /href="(?!(https?:\/\/|mailto:|tel:|#|\/))([^"]+)"/gi,
        (match, _negLookahead, url) => `href="https://${url}"`
    );
};

/**
 * Recursively process all string values in an object/array to fix relative URLs.
 */
const fixUrlsInContent = (content) => {
    if (typeof content === 'string') {
        return fixRelativeUrls(content);
    }
    if (Array.isArray(content)) {
        return content.map(item => fixUrlsInContent(item));
    }
    if (typeof content === 'object' && content !== null) {
        const fixed = {};
        for (const [key, value] of Object.entries(content)) {
            fixed[key] = fixUrlsInContent(value);
        }
        return fixed;
    }
    return content;
};

const useCMSContent = (pageName) => {
    const [cmsContent, setCmsContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCmsContent = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/content?page=${pageName}`);
                const contentMap = {};
                res.data.forEach(item => {
                    contentMap[item.section] = fixUrlsInContent(item.content);
                });
                
                // Also get SEO settings if they exist on any section (usually 'seo-settings' section)
                const seoSection = res.data.find(item => item.section === 'seo-settings');
                if (seoSection && seoSection.seoSettings) {
                    contentMap['_seo'] = seoSection.seoSettings;
                }

                setCmsContent(contentMap);
                setError(null);
            } catch (err) {
                console.error(`Error fetching CMS content for ${pageName}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCmsContent();
    }, [pageName]);

    return { cmsContent, loading, error };
};

export default useCMSContent;
