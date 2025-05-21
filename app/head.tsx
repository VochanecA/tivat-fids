// app/head.tsx
export default function Head() {
  return (
    <>
      <title>Tivat Airport Live Flight Tracker | Arrivals & Departures</title>
      <meta name="description" content="Real-time flight arrivals and departures for Tivat Airport. Track flights, get up-to-date schedules, and more." />
      <meta name="keywords" content="Tivat Airport, flight tracker, arrivals, departures, live flights, Montenegro airport" />
      <meta property="og:title" content="Tivat Airport Live Flight Tracker" />
      <meta property="og:description" content="Live arrivals and departures for Tivat Airport. Stay updated with real-time flight information." />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tivat-fids.vercel.app/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Tivat Airport Live Flight Tracker" />
      <meta name="twitter:description" content="Live arrivals and departures for Tivat Airport. Stay updated with real-time flight information." />
      <meta name="twitter:image" content="/og-image.png" />
      <link rel="canonical" href="https://tivat-fids.vercel.app/" />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Airport",
            "name": "Tivat Airport",
            "iataCode": "TIV",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Montenegro"
            },
            "url": "https://tivat-fids.vercel.app"
          }),
        }}
      />
    </>
  );
}
