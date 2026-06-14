import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { RevealObserver } from "@/components/reveal-observer";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const ogTitle = `${siteConfig.name} — ${siteConfig.slogan}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: ogTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Metaalbewerking",
  keywords: [
    "staalconstructies",
    "maatwerk staal",
    "metaalbewerking",
    "lassen",
    "lasersnijden",
    "plooien",
    "stalen trappen",
    "leuningen op maat",
    "stalen poorten",
    "fietsenstallingen",
    "stalen schrijnwerk",
    "smederij Gent",
    "metaalbewerker Oost-Vlaanderen",
    "Gent",
    "Oost-Vlaanderen",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: ogTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl-BE"
      className={cn(schibsted.variable, hanken.variable)}
    >
      <body className="min-h-screen bg-paper text-steel-600 antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
