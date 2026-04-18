// app/about/page.tsx — About page (/about)
// Server component: reads searchParams and passes the active tab to the client component.
// JSON-LD Person schema injected here for SEO.

import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { identity, education } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cognitive Science graduate, product tester, and developer. Background, experience, and toolkit.",
  alternates: {
    canonical: "https://rabih.app/about",
  },
  openGraph: {
    title: "About | Rabih Siddiqui",
    description:
      "Cognitive Science graduate, product tester, and developer. Background, experience, and toolkit.",
    url: "https://rabih.app/about",
  },
};

type ValidTab = "OVERVIEW" | "EXPERIENCE" | "TOOLKIT";
const VALID_TABS = new Set<ValidTab>(["OVERVIEW", "EXPERIENCE", "TOOLKIT"]);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  url: "https://rabih.app",
  jobTitle: identity.title,
  description: identity.bio,
  email: identity.email,
  sameAs: [identity.github, identity.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
    address: { "@type": "PostalAddress", addressLocality: education.location },
  },
  knowsAbout: [
    "Cognitive Science",
    "UX Research",
    "Product Testing",
    "TypeScript",
    "Next.js",
    "User Experience Design",
  ],
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const rawTab = (params.tab ?? "").toUpperCase();
  const initialTab: ValidTab = VALID_TABS.has(rawTab as ValidTab)
    ? (rawTab as ValidTab)
    : "OVERVIEW";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent initialTab={initialTab} />
    </>
  );
}
