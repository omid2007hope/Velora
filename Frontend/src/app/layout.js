// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Providers from "./providers";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  siteConfig,
} from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  category: siteConfig.category,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl("/twitter-image")],
  },
};

export const viewport = {
  themeColor: "#451a03",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
      </body>
    </html>
  );
}


