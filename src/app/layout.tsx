import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { JsonLd } from "@/components/layout/JsonLd";
import { SITE } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://shudhanshu097.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE.name} — ${SITE.role}`,
  description: `${SITE.program} at ${SITE.institution}. ${SITE.tagline}. Business analytics, data visualization, and strategic decision-making.`,
  keywords: [
    "Data Analyst",
    "Business Data Analyst",
    "IIM Jammu",
    "IPM",
    "Data Analytics",
    "Power BI",
    "Python",
    "SQL",
    SITE.name,
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <LoadingProvider>
          <MotionProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </MotionProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
