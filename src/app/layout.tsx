import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { JsonLd, organizationLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/Motion";
import { site } from "@/content/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: `${site.name}: ${site.tagline}`, description: site.description, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#090B11", colorScheme: "dark light" };

// Runs before paint so there is no theme flash. Dark is the default.
const themeScript = `try{var t=localStorage.getItem('juicer_theme')||'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={organizationLd} />
      </head>
      <body>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
