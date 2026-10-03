import { faq } from "@/data/faq";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site.config";

/** Social URL without tracking query strings. */
function clean(url: string) {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname}`;
  } catch {
    return url;
  }
}

/** Schema.org data for the home page: website, person, business, and FAQ. */
export function buildHomeSchema() {
  const { url, brandName, owner, ownerRole, description, email, whatsapp, socials } = siteConfig;
  const sameAs = Object.values(socials).filter(Boolean).map(clean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: brandName,
        description,
        inLanguage: "en",
        publisher: { "@id": `${url}/#business` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: owner,
        jobTitle: ownerRole,
        url,
        email,
        sameAs,
        knowsAbout: ["Shopify", "Liquid", "Shopify Plus", "WordPress", "ReactJS", "Next.js", "eCommerce development"],
        worksFor: { "@id": `${url}/#business` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#business`,
        name: brandName,
        url,
        description,
        founder: { "@id": `${url}/#person` },
        email,
        areaServed: "Worldwide",
        sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email,
          telephone: `+${whatsapp}`,
          availableLanguage: ["English", "Urdu"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web development services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}
