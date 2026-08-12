import { useState, useEffect, useRef } from "react";
import api from "../utils/api";

const MAX_RETRIES = 3;
const RETRY_DELAYS = [2000, 5000, 10000]; // ms — total worst-case: ~27s for Render cold start

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

  // Use a ref so the closure inside setTimeout always sees the latest value
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    let retryCount = 0;

    const fetchCmsContent = async () => {
      try {
        const res = await api.get(`/content?page=${pageName}`);

        if (!isMountedRef.current) return;

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
        setLoading(false);
      } catch (err) {
        if (!isMountedRef.current) return;

        // Retry on failure (handles Render cold starts)
        if (retryCount < MAX_RETRIES - 1) {
          const delay = RETRY_DELAYS[retryCount] ?? 10000;
          retryCount++;
          setTimeout(fetchCmsContent, delay);
          return; // Keep loading=true while retrying
        }

        // Exhausted retries — fall back to hardcoded content silently
        console.error(
          `CMS fetch failed for "${pageName}" after ${MAX_RETRIES} attempts:`,
          err.message,
        );
        setError(err);
        setLoading(false);
      }
    };

    fetchCmsContent();

    return () => {
      isMountedRef.current = false;
    };
  }, [pageName]);

  return { cmsContent, loading, error };
};

export default useCMSContent;
