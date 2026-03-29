import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DL Dietmar Lobnig GmbH | Gebrauchtwagen Klagenfurt",
  description:
    "Ihr Profi in Sachen Neu- und Gebrauchtwagen in Klagenfurt. Persönliche Beratung, faire Preise und handverlesene Fahrzeuge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        {children}
      </body>
    </html>
  );
}
