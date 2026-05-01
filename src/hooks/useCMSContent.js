import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Fix relative URLs in HTML content.
 */
const fixRelativeUrls = (html) => {
  if (typeof html !== "string") return html;

  return html.replace(
    /href="(?!(https?:\/\/|mailto:|tel:|#|\/))([^"]+)"/gi,
    (match, _negLookahead, url) => `href="https://${url}"`,
  );
};

/**
 * Recursively process all string values in an object/array
 */
const fixUrlsInContent = (content) => {
  if (typeof content === "string") {
    return fixRelativeUrls(content);
  }

  if (Array.isArray(content)) {
    return content.map((item) => fixUrlsInContent(item));
  }

  if (typeof content === "object" && content !== null) {
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

        const res = await api.get(`/content?page=${pageName}`);

        // 🔥 Normalize response safely
        let dataArray = [];

        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else if (Array.isArray(res.data?.data)) {
          dataArray = res.data.data;
        } else {
          console.error("❌ Invalid CMS response:", res.data);
          dataArray = [];
        }

        const contentMap = {};

        dataArray.forEach((item) => {
          if (!item || !item.section) return;
          contentMap[item.section] = fixUrlsInContent(item.content);
        });

        // SEO handling
        const seoSection = dataArray.find(
          (item) => item.section === "seo-settings",
        );

        if (seoSection && seoSection.seoSettings) {
          contentMap["_seo"] = seoSection.seoSettings;
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
