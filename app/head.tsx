// app/head.tsx
export default function Head() {
  // Define common metadata values for reuse
  const siteName = "Tivat Airport Live Flight Tracker";
  const siteUrl = "https://tivat-fids.vercel.app";
  const shortDescription = "Real-time flight arrivals and departures for Tivat Airport (TIV).";
  const longDescription = "Real-time flight arrivals and departures for Tivat Airport. Track flights, get up-to-date schedules, flight status, and airline information for Montenegro's coastal gateway.";
  
  return (
    <>
      {/* Primary Meta Tags */}
      <title>Tivat Airport Live Flight Tracker | Real-Time Arrivals & Departures | TIV</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={longDescription} />
      <meta name="keywords" content="Tivat Airport, TIV, flight tracker, arrivals, departures, live flights, Montenegro airport, real-time flights, flight status, flight information, Adriatic coast, Tivat flights, Montenegro travel" />
      <meta name="author" content="Tivat Airport Flight Information" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="theme-color" content="#1a73e8" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content="Tivat Airport (TIV) Live Flight Tracker | Real-Time Flight Information" />
      <meta property="og:description" content={longDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:image:alt" content="Tivat Airport Flight Information Display" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Tivat Airport (TIV) Live Flight Tracker | Montenegro" />
      <meta name="twitter:description" content={longDescription} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      <meta name="twitter:image:alt" content="Tivat Airport Flight Information Dashboard" />
      <meta name="twitter:creator" content="@tivatairport" />

      {/* Link Tags */}
      <link rel="canonical" href={siteUrl} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="alternate" hrefLang="en" href={siteUrl} />
      <link rel="alternate" hrefLang="me" href={`${siteUrl}/me`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Enhanced Structured Data - Airport Information */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Airport",
            "name": "Tivat Airport",
            "alternateName": "Aerodrom Tivat",
            "iataCode": "TIV",
            "icaoCode": "LYTV",
            "description": shortDescription,
            "url": siteUrl,
            "image": `${siteUrl}/tivat-airport.jpg`,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Montenegro",
              "addressLocality": "Tivat",
              "postalCode": "85320",
              "streetAddress": "Aerodrom Tivat, Adriatic Highway"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "42.404722",
              "longitude": "18.723333"
            },
            "telephone": "+382 32 670 930",
            "openingHours": "Mo-Su 00:00-24:00",
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "WiFi",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Duty Free Shopping",
                "value": true
              }
            ]
          }),
        }}
      />

      {/* Flight Tracking Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": siteUrl,
            "description": longDescription,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I check flight arrivals at Tivat Airport?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can check real-time flight arrivals at Tivat Airport using our live flight tracker. Simply visit our website and navigate to the Arrivals section to see updated flight information."
                }
              },
              {
                "@type": "Question",
                "name": "What airlines fly to Tivat Airport?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tivat Airport (TIV) is served by multiple airlines including Air Montenegro, Air Serbia, Turkish Airlines, EL AL, ISRAIR, Transavia, Lufthansa, Norwegian, easyJet, and several seasonal charter operations during summer months."
                }
              },
              {
                "@type": "Question",
                "name": "How far is Tivat Airport from Kotor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tivat Airport is approximately 8 kilometers (5 miles) from Kotor, which is about a 15-minute drive depending on traffic conditions."
                }
              }
            ]
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@id": siteUrl,
                  "name": "Home"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": `${siteUrl}/flights`,
                  "name": "Flights"
                }
              }
            ]
          }),
        }}
      />
    </>
  );
}