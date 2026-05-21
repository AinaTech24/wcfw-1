import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../utils/api";

const DynamicServicePage = () => {
  const { slug } = useParams();

  const [sections, setSections] = useState([]);
  const [seo, setSeo] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await api.get(`/content?page=${slug}`);

        if (!res.data || res.data.length === 0) {
          setNotFound(true);
          return;
        }

        const seoSection = res.data.find(
          (s) => s.section === "seo-settings"
        );

        const contentSections = res.data.filter(
          (s) => s.section !== "seo-settings"
        );

        setSeo(seoSection?.seoSettings || {});
        setSections(contentSections);
      } catch (err) {
        console.log(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (notFound) {
  return (
    <div className="py-20 text-center">
      Page Not Found
    </div>
  );
}

  return (
    <>
      <Helmet>
        <title>{seo.metaTitle || "WCFW"}</title>

        <meta
          name="description"
          content={seo.metaDescription || ""}
        />

        <meta
          name="keywords"
          content={seo.metaKeywords || ""}
        />

        <link
          rel="canonical"
          href={seo.canonicalUrl || ""}
        />

        <meta
          name="robots"
          content={seo.robotsTag || "index, follow"}
        />

        {seo.schemaMarkup && (
          <script type="application/ld+json">
            {seo.schemaMarkup}
          </script>
        )}
      </Helmet>

      <main className="container px-4 py-10 mx-auto">
        {sections.map((section, index) => (
          <section key={index} className="mb-12">
            {section?.content?.title && (
              <div
                dangerouslySetInnerHTML={{
                  __html: section.content.title,
                }}
              />
            )}

            {section?.content?.heading && (
              <div
                dangerouslySetInnerHTML={{
                  __html: section.content.heading,
                }}
              />
            )}

            {section?.content?.subheading && (
              <div
                dangerouslySetInnerHTML={{
                  __html: section.content.subheading,
                }}
              />
            )}

            {section?.content?.description && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: section.content.description,
                }}
              />
            )}

            {section?.content?.text && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: section.content.text,
                }}
              />
            )}
          </section>
        ))}

        {/* FAQs */}
        {seo?.faqSchema?.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-3xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {seo.faqSchema.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-xl"
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    {faq.question}
                  </h3>

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