import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import EntranceLoader from "./components/EntranceLoader";
import { LocalBusinessJsonLd } from "./components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sevenDays = localFont({
  src: "../public/fonts/7days.ttf",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "DL Dietmar Lobnig GmbH | Gebrauchtwagen Klagenfurt",
    template: "%s | DL Dietmar Lobnig GmbH",
  },
  description:
    "Ihr Profi für Gebrauchtwagen in Klagenfurt seit 1996. Persönliche Beratung, faire Preise und handverlesene Fahrzeuge — Ankauf, Verkauf und Finanzierung.",
  keywords: [
    "Gebrauchtwagen Klagenfurt",
    "Dietmar Lobnig",
    "Autohandel Kärnten",
    "Gebrauchtwagen kaufen",
    "Fahrzeugankauf",
    "Autofinanzierung",
    "Gebrauchtwagenhändler Klagenfurt",
  ],
  openGraph: {
    title: "DL Dietmar Lobnig GmbH | Gebrauchtwagen Klagenfurt",
    description:
      "Handverlesene Gebrauchtwagen, persönlich geprüft. Seit 1996 Ihr verlässlicher Partner in Klagenfurt.",
    locale: "de_AT",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon-512.png",
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
    <html lang="de">
      <body className={`${inter.variable} ${sevenDays.variable}`}>
        <LocalBusinessJsonLd />
        <EntranceLoader />
        {children}
      </body>
    </html>
  );
}
