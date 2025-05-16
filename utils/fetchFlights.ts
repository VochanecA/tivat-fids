// utils/fetchFlights.ts

interface RawFlight {
  Updateovano: string;
  Datum: string;
  Dan: string;
  TipLeta: string;
  KompanijaNaziv: string;
  Kompanija: string;
  KompanijaICAO: string;
  BrojLeta: string;
  IATA: string;
  Grad: string;
  Planirano: string;
  Predvidjeno: string;
  Aktuelno: string;
  Terminal: string;
  CheckIn: string;
  Gate: string;
  Aerodrom: string;
  Status: string;
  StatusEN: string;
}

interface ProcessedFlight {
  ident: string;
  status: string;
  scheduled_out: string;
  estimated_out: string;
  actual_out: string;
  origin: { code: string };
  destination: { code: string };
  grad: string;
  Kompanija: string;
  KompanijaICAO: string;
  KompanijaNaziv: string;
  checkIn: string;
  gate: string;
  TipLeta: string;
  Terminal: string;
}

export interface ProcessedData {
  departures: ProcessedFlight[];
  arrivals: ProcessedFlight[];
}

const mapStatus = (statusEN: string, status: string): string => {
  if (status === 'C01PRO') return 'Processing';
  if (status === 'A00CNL') return 'Cancelled';
  if (status === 'A02DVT') return 'Diverted';
  if (status === 'A04HLD') return 'Hold';
  if (status === 'C02BRD') return 'Boarding';
  if (status === 'C03LST') return 'Final Call';
  if (status === 'A09DEP') return 'Departed';
  if (status === 'A06ARR') return 'Arrived';
  if (status === 'G02GCL') return 'Closed';
  return statusEN || 'Scheduled';
};

const formatTime = (time: string): string => {
  if (!time || time.trim() === '') return '';
  return time.replace(/(\d{2})(\d{2})/, '$1:$2');
};

const isFlightRecent = (flightTime: string, mapStatus: string): boolean => {
  // Don't show flights with "Departed" or "Arrived" status
  if (mapStatus === 'Departed' || mapStatus === 'Arrived') {
    return false;
  }
  
  // For other statuses, always show the flight
  return true;
};

const generateFingerprint = (): { platform: string; browser: string } => {
  const platforms = ['Windows NT 10.0; Win64; x64', 'Macintosh; Intel Mac OS X 10_15_7'];
  const browsers = [
    'Chrome/120.0.0.0 Safari/537.36',
    'Chrome/121.0.0.0 Safari/537.36',
    'Chrome/122.0.0.0 Safari/537.36'
  ];

  return {
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    browser: browsers[Math.floor(Math.random() * browsers.length)]
  };
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries: number = 3,
  delayTime: number = 3000
): Promise<any> => {
  let cookies = '';
  const fingerprint = generateFingerprint();

  try {
    const homeResponse = await fetch('https://montenegroairports.com/', {
      headers: {
        'User-Agent': `Mozilla/5.0 (${fingerprint.platform}) AppleWebKit/537.36 (KHTML, like Gecko) ${fingerprint.browser}`,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      }
    });

    const setCookieHeader = homeResponse.headers.get('set-cookie');
    if (setCookieHeader) {
      cookies = setCookieHeader.split(',').map(cookie => cookie.split(';')[0]).join('; ');
    }

    await delay(1000);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn('Failed to establish initial session:', errorMessage);
  }

  for (let i = 0; i < retries; i++) {
    try {
      if (i > 0) {
        await delay(Math.random() * 1000 + delayTime);
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': `Mozilla/5.0 (${fingerprint.platform}) AppleWebKit/537.36 (KHTML, like Gecko) ${fingerprint.browser}`,
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Referer': 'https://montenegroairports.com/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache',
          'Cookie': cookies,
          ...options.headers,
        },
      });

      const text = await response.text();

      if (!response.ok) {
        console.error('Response not OK:', {
          status: response.status,
          statusText: response.statusText,
          body: text.substring(0, 200)
        });

        if (text.includes('Just a moment')) {
          await delay(5000);
        }

        if (i === retries - 1) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        continue;
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON:', text.substring(0, 200));
        throw new Error('Response was not valid JSON');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Attempt ${i + 1}/${retries} failed:`, errorMessage);
      if (i === retries - 1) throw error;
    }
  }
};

export const fetchFlights = async (): Promise<ProcessedData> => {
  try {
    const timestamp = Date.now();
    const url = `https://montenegroairports.com/aerodromixs/cache-flights.php?airport=tv&timestamp=${timestamp}`;

    const options = {
      method: 'GET',
      cache: 'no-store' as RequestCache,
    };

    const rawData: RawFlight[] = await fetchWithRetry(url, options);

    const processedData: ProcessedData = {
      departures: rawData
        .filter((flight) => flight.TipLeta === 'O' && isFlightRecent(flight.Aktuelno, mapStatus(flight.StatusEN, flight.Status)))
        .map((flight) => ({
          ident: `${flight.BrojLeta}`,
          status: mapStatus(flight.StatusEN, flight.Status),
          scheduled_out: formatTime(flight.Planirano),
          estimated_out: formatTime(flight.Predvidjeno),
          actual_out: formatTime(flight.Aktuelno),
          origin: { code: 'TIV' },
          destination: { code: flight.IATA },
          grad: flight.Grad,
          Kompanija: flight.Kompanija,
          KompanijaICAO: flight.KompanijaICAO,
          KompanijaNaziv: flight.KompanijaNaziv,
          checkIn: flight.CheckIn,
          gate: flight.Gate,
          TipLeta: flight.TipLeta,
          Terminal: flight.Terminal || '',
        })),
      arrivals: rawData
        .filter((flight) => flight.TipLeta === 'I' && isFlightRecent(flight.Aktuelno, mapStatus(flight.StatusEN, flight.Status)))
        .map((flight) => ({
          ident: `${flight.BrojLeta}`,
          status: mapStatus(flight.StatusEN, flight.Status),
          scheduled_out: formatTime(flight.Planirano),
          estimated_out: formatTime(flight.Predvidjeno),
          actual_out: formatTime(flight.Aktuelno),
          origin: { code: flight.IATA },
          grad: flight.Grad,
          destination: { code: 'TIV' },
          Kompanija: flight.Kompanija,
          KompanijaICAO: flight.KompanijaICAO,
          KompanijaNaziv: flight.KompanijaNaziv,
          checkIn: flight.CheckIn,
          gate: flight.Gate,
          TipLeta: flight.TipLeta,
          Terminal: flight.Terminal || '',
        })),
    };

    return processedData;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
