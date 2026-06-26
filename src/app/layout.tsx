import { Suspense } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "../assets/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteChangeLoader from "@/components/RouteChangeLoader";

export const metadata: Metadata = {
  title: {
    default: "Oikotan – Indian Bengali Community in Lithuania",
    template: "%s | Oikotan",
  },
  description:
    "Oikotan is a non-profit Indian Bengali community in Lithuania celebrating heritage, folk traditions, and togetherness through festivals, dainos, and cultural events.",
  keywords: ["Lithuanian", "Durga Puja", "cultural organization", "Indian community", "diaspora", "folk traditions", "events", "festivals", "dainos", "togetherness", "heritage", "community", "non-profit", "Bengali Community", "Lithuania"],
  openGraph: {
    type: "website",
    locale: "en_NL",
    siteName: "Oikotan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-neutral-50 text-neutral-900">
        <Suspense fallback={null}>
          <RouteChangeLoader />
        </Suspense>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Analytics />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
