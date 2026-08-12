import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../utils/api";

const MAX_RETRIES = 3;
const RETRY_DELAYS = [3000, 6000, 12000]; // ms between retries

const DynamicServicePage = () => {
  const { slug } = useParams();

  const [sections, setSections] = useState([]);
  const [seo, setSeo] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);   // truly empty — data doesn't exist
  const [loadError, setLoadError] = useState(false); // API unreachable (cold start etc.)
  const [retryCount, setRetryCount] = useState(0);

  const fetchPage = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const res = await api.get(`/content?page=${slug}`);

      // Genuinely empty — page has no CMS content, treat as 404
      if (!res.data || res.data.length === 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const seoSection = res.data.find((s) => s.section === "seo-settings");
      const contentSections = res.data.filter(
        (s) => s.section !== "seo-settings"
      );

      setSeo(seoSection?.seoSettings || {});
      setSections(contentSections);
      setNotFound(false);
    } catch (err) {
      // API failure ≠ page not found. Could be Render cold-starting (takes 15-30s).
      // Retry automatically before giving up.
      console.warn(`DynamicServicePage fetch failed for "${slug}":`, err.message);

      if (retryCount < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[retryCount] ?? 10000;
        setTimeout(() => setRetryCount((c) => c + 1), delay);
        return; // keep loading=true while retrying
      }

      // Exhausted retries — show a neutral error (NOT "page not found")
      setLoadError(true);
    } finally {
      // Only stop loading once we have data or truly gave up
      if (retryCount >= MAX_RETRIES - 1) {
        setLoading(false);
      }
    }
  }, [slug, retryCount]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  /* ── Loading / Retry ── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center gap-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        {retryCount > 0 && (
          <p className="text-sm text-slate-500">
            Connecting… (attempt {retryCount + 1}/{MAX_RETRIES})
          </p>
        )}
      </div>
    );
  }

  /* ── True 404 — data simply doesn't exist ── */
  if (notFound) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-500">
          We couldn't find the page you're looking for.
        </p>
      </div>
    );
  }

  /* ── API unreachable after retries — neutral message, NOT a 404 ── */
  if (loadError) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          Content temporarily unavailable
        </h2>
        <p className="text-slate-500 mb-8">
          We're having trouble loading this page. Please try again in a moment.
        </p>
        <button
          onClick={() => {
            setRetryCount(0);
            setLoadError(false);
            setLoading(true);
          }}
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  /* ── Normal render ── */
  return (
    <>
      <Helmet>
        <title>{seo.metaTitle || "WCFW"}</title>
        <meta name="description" content={seo.metaDescription || ""} />
        <meta name="keywords" content={seo.metaKeywords || ""} />
        <link rel="canonical" href={seo.canonicalUrl || ""} />
        <meta name="robots" content={seo.robotsTag || "index, follow"} />
        {seo.schemaMarkup && (
          <script type="application/ld+json">{seo.schemaMarkup}</script>
        )}
      </Helmet>

      <main className="container px-4 py-10 mx-auto">
        {sections.map((section, index) => (
          <section key={index} className="mb-12">
            {section?.content?.title && (
              <div dangerouslySetInnerHTML={{ __html: section.content.title }} />
            )}
            {section?.content?.heading && (
              <div dangerouslySetInnerHTML={{ __html: section.content.heading }} />
            )}
            {section?.content?.subheading && (
              <div dangerouslySetInnerHTML={{ __html: section.content.subheading }} />
            )}
            {section?.content?.description && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content.description }}
              />
            )}
            {section?.content?.text && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content.text }}
              />
            )}
          </section>
        ))}

        {seo?.faqSchema?.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {seo.faqSchema.map((faq, index) => (
                <div key={index} className="p-6 border rounded-xl">
                  <h3 className="mb-2 text-xl font-semibold">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default DynamicServicePage;
