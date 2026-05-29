import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider, themeScript } from "@/components/ui/ThemeProvider";
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
  title: "Malavya Mankar — AI & Full-Stack Developer",
  description:
    "AI & Full-Stack Developer building intelligent, production-ready systems. First-year B.E. student in AI & Data Science at VESIT, Mumbai.",
  keywords: [
    "Malavya Mankar",
    "AI Developer",
    "Full-Stack Developer",
    "Portfolio",
    "VESIT",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Malavya Mankar" }],
  openGraph: {
    title: "Malavya Mankar — AI & Full-Stack Developer",
    description:
      "Building intelligent, production-ready systems that turn ideas into shipped products.",
    url: "https://malavya.dev",
    siteName: "Malavya Mankar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malavya Mankar — AI & Full-Stack Developer",
    description:
      "Building intelligent, production-ready systems that turn ideas into shipped products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      </head>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
