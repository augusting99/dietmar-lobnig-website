import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fahrzeuge",
  description:
    "Entdecken Sie unsere handverlesenen Gebrauchtwagen — Audi, BMW, Mercedes, VW und mehr. Jedes Fahrzeug persönlich geprüft und aufbereitet.",
  openGraph: {
    title: "Fahrzeuge | DL Dietmar Lobnig GmbH",
    description:
      "Handverlesene Gebrauchtwagen in Klagenfurt. Faire Preise, persönliche Beratung seit 1996.",
  },
};

export default function FahrzeugeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
