export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "DL Dietmar Lobnig GmbH",
    description:
      "Ihr Profi für Gebrauchtwagen in Klagenfurt seit 1996. Persönliche Beratung, faire Preise und handverlesene Fahrzeuge.",
    url: "https://dietmar-lobnig-website.vercel.app",
    telephone: "+436643418135",
    email: "lobnig@lobnig.cc",
    foundingDate: "1996",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Siriusstraße 13",
      addressLocality: "Klagenfurt",
      postalCode: "9020",
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.6365,
      longitude: 14.3122,
    },
    sameAs: ["https://www.instagram.com/lobniggmbh/"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "€€",
    image: "https://dietmar-lobnig-website.vercel.app/dl_logo_wei%C3%9F.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function VehicleListJsonLd() {
  const vehicles = [
    {
      name: "Audi A6 Avant 50 TDI",
      brand: "Audi",
      year: 2022,
      mileage: 68000,
      fuel: "Diesel",
      price: 49900,
    },
    {
      name: "Volkswagen Golf 8 GTI",
      brand: "Volkswagen",
      year: 2023,
      mileage: 23000,
      fuel: "Benzin",
      price: 38500,
    },
    {
      name: "BMW 520d xDrive Touring",
      brand: "BMW",
      year: 2021,
      mileage: 57000,
      fuel: "Diesel",
      price: 42900,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gebrauchtwagen bei Dietmar Lobnig GmbH",
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Car",
        name: v.name,
        brand: { "@type": "Brand", name: v.brand },
        modelDate: String(v.year),
        mileageFromOdometer: {
          "@type": "QuantitativeValue",
          value: v.mileage,
          unitCode: "KMT",
        },
        fuelType: v.fuel,
        offers: {
          "@type": "Offer",
          price: v.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "AutoDealer",
            name: "DL Dietmar Lobnig GmbH",
          },
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
