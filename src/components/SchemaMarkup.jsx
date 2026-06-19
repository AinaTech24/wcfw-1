import React from 'react';

const SchemaMarkup = ({ data }) => {
    return (
        <script type="application/ld+json">
            {JSON.stringify(data)}
        </script>
    );
};

export const OrganizationSchema = () => {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "We Care Freedom Wealth Pvt Ltd",
        "url": "https://www.wcfw.in",
        "logo": "https://www.wcfw.in/logo.png", // Ensure this exists
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-1234567890",
            "contactType": "customer service"
        },
        "sameAs": [
            "https://www.facebook.com/wcfw",
            "https://twitter.com/wcfw",
            "https://www.linkedin.com/company/wcfw"
        ]
    };
    return <SchemaMarkup data={data} />;
};

export const FinancialServiceSchema = () => {
    const data = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "We Care Freedom Wealth",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ahmedabad",
            "addressRegion": "Gujarat",
            "postalCode": "380001",
            "addressCountry": "IN"
        },
        "url": "https://www.wcfw.in",
        "priceRange": "$$"
    };
    return <SchemaMarkup data={data} />;
};

export const FAQSchema = ({ faqs }) => {
    if (!faqs || faqs.length === 0) return null;
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
    return <SchemaMarkup data={data} />;
};

export default SchemaMarkup;
