import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider, themeScript } from "@/components/ui/ThemeProvider";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ClickSpark } from "@/components/ui/ClickSpark";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Malavya Mankar — Full Stack Developer & AI Engineer",
    template: "%s | Malavya Mankar",
  },
  description:
    "Malavya Mankar is a Full Stack Developer, React Developer, Node.js Developer, and AI Engineer building intelligent, production-ready web applications. B.E. AI & Data Science student at VESIT, Mumbai. Hackathon participant and software engineer with expertise in PostgreSQL, Express.js, and modern web development.",
  keywords: [
    "Malavya Mankar",
    "Malavya",
    "Malavya Mankar Portfolio",
    "Malavya Developer",
    "Malavya Full Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "PostgreSQL Developer",
    "Software Engineer",
    "Hackathon Participant",
    "AI Engineer",
    "Web Developer",
    "React.js",
    "Express.js",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "VESIT Mumbai",
    "Portfolio",
  ],
  authors: [{ name: "Malavya Mankar", url: SITE_URL }],
  creator: "Malavya Mankar",
  publisher: "Malavya Mankar",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "google8c220c28f2a88b7b",
  },
  openGraph: {
    title: "Malavya Mankar — Full Stack Developer & AI Engineer",
    description:
      "Malavya Mankar is a Full Stack Developer specializing in React.js, Node.js, Express.js, and PostgreSQL. Hackathon winner building production-ready AI-powered web applications.",
    url: SITE_URL,
    siteName: "Malavya Mankar — Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Malavya Mankar — Full Stack Developer & AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malavya Mankar — Full Stack Developer & AI Engineer",
    description:
      "Malavya Mankar is a Full Stack Developer specializing in React.js, Node.js, Express.js, and PostgreSQL. Hackathon winner building production-ready AI-powered web applications.",
    images: [`${SITE_URL}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** JSON-LD Person schema — https://schema.org/Person */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Malavya Mankar",
  alternateName: "Malavya",
  url: SITE_URL,
  image: `${SITE_URL}/images/og-image.png`,
  email: "malavyamankar@gmail.com",
  jobTitle: "Full Stack Developer & AI Engineer",
  description:
    "Full Stack Developer and AI Engineer specializing in React.js, Node.js, Express.js, PostgreSQL, and modern web development. Hackathon participant and software engineer at VESIT, Mumbai.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vivekanand Education Society's Institute of Technology (VESIT)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Full Stack Development",
    "React.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Web Development",
    "AI Engineering",
    "Hackathons",
    "Software Engineering",
  ],
  sameAs: [
    "https://github.com/malavya1411",
    "https://www.linkedin.com/in/malavya-mankar-002037382",
    "https://devpost.com/malavya1411",
    "https://leetcode.com/u/Malavya_Mankar/",
  ],
};

/** Conditional Google Analytics — set NEXT_PUBLIC_GA_ID env var to enable */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* JSON-LD Structured Data — Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* Google Analytics (only when GA_ID is set) */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        <ThemeProvider>
          <div className="grain-layer" />
          <PageLoader />
          <ScrollProgress />
          <ClickSpark
            sparkColor="var(--accent)"
            sparkSize={12}
            sparkRadius={16}
            sparkCount={6}
            duration={320}
          >
            {children}
          </ClickSpark>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
