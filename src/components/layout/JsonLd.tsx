import { SITE } from "@/lib/content";

const SITE_URL = "https://shudhanshu097.github.io";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    url: SITE_URL,
    image: `${SITE_URL}${SITE.profileImage}`,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: SITE.institution,
    },
    knowsAbout: [
      "Data Analytics",
      "Python",
      "SQL",
      "Power BI",
      "Tableau",
      "Data Visualization",
    ],
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [SITE.linkedin, SITE.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
