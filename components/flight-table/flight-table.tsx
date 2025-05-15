'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FlightTableHeader } from './flight-table-header';
import { FlightRow as OriginalFlightRow } from './flight-row';
import { AirlineLogo } from './airline-logo';

interface Flight {
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

interface FlightRowProps {
  flight: Flight;
  index?: number;
  activeTab: 'arrivals' | 'departures';
}


interface ProcessedData {
  departures: Flight[];
  arrivals: Flight[];
}

const STATUS_DEPARTED = 'departed';
const STATUS_ARRIVED = 'arrived';

const thClassNames =
  'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400';

const FlightRow = React.memo(OriginalFlightRow);

// --- Pills and blink helpers ---
function getStatusClass(status: string) {
  switch (status) {
    case 'Processing':
      return 'bg-green-800 text-green-50 dark:bg-green-800 dark:text-green-100';
    case 'Boarding':
      return 'bg-green-100 text-green-800 dark:bg-yellow-400 dark:text-black';
    case 'Final Call':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'Departed':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Arrived':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Closed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Delay':
      return 'bg-red-500 text-red-50 dark:bg-red-500 dark:text-red-50';
    case 'On time':
      return 'bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-200';
    case 'Cancelled':
      return 'bg-red-600 text-white dark:bg-red-700 dark:text-red-200';
    case 'Scheduled':
      return 'bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

function getTerminalClass(terminal: string) {
  const t = terminal?.toUpperCase() || '';
  if (t === 'T02' || t === 'T2') return 'bg-red-600 text-white';
  if (t === 'T01' || t === 'T1') return 'bg-yellow-400 text-black';
  return '';
}

function useBlink(status: string) {
  const [blinkClass, setBlinkClass] = useState('');
  useEffect(() => {
    if (status === 'Processing') setBlinkClass('blink-slow');
    else if (status === 'Delay') setBlinkClass('blink-fast');
    else setBlinkClass('');
  }, [status]);
  return blinkClass;
}

// --- Mobile Card ---
function FlightCard({ flight }: { flight: Flight }) {
  const blinkClass = useBlink(flight.status);
  const statusClass = getStatusClass(flight.status);
  const terminalClass = getTerminalClass(flight.Terminal);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink-slow {
          animation: blink 2s infinite;
        }
        .blink-fast {
          animation: blink 0.4s infinite;
        }
      `}</style>
      <div className="block md:hidden border border-gray-200 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
        <div className="flex items-center mb-2 space-x-2">
          <AirlineLogo name={flight.KompanijaNaziv} icao={flight.KompanijaICAO} />
          <span className="font-semibold">{flight.KompanijaNaziv}</span>
          <a
            href={`https://www.flightaware.com/live/flight/${flight.KompanijaICAO}${flight.ident}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-gray-500 dark:text-yellow-300 no-underline hover:text-orange-500 transition-colors"
            title="View on FlightAware"
            tabIndex={0}
          >
            {flight.Kompanija}{flight.ident}
          </a>
        </div>
        <div className="flex justify-between mb-2">
          <div>
            <span className="text-base font-bold text-red-600 dark:text-orange-400">{flight.grad}</span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {flight.TipLeta === 'O' ? flight.destination.code : flight.origin.code}
            </span>
          </div>
          <span
            className={`inline-flex font-semibold rounded-full ${statusClass} ${blinkClass}`}
            style={{ padding: '0.25rem 0.75rem', minWidth: '2.5rem', height: '2rem' }}
            title={`Status: ${flight.status}`}
          >
            {flight.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 text-xs text-gray-600 dark:text-gray-400">
          <div>
            <span className="font-semibold">Scheduled:</span> {flight.scheduled_out}
          </div>
          <div>
            <span className="font-semibold">Estimated:</span> {flight.estimated_out}
          </div>
          <div>
            <span className="font-semibold">Actual:</span> {flight.actual_out}
          </div>
        </div>
 <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
  <div>
    <span className="font-semibold">Terminal:</span>{' '}
    {flight.Terminal ? (
      <span
        className={`inline-flex items-center justify-center rounded-full px-3 py-1 font-semibold tracking-wide ${terminalClass}`}
        style={{ minWidth: '2.5rem', height: '2rem' }}
      >
        {flight.Terminal}
      </span>
    ) : (
      '-'
    )}
  </div>
  <div className="flex flex-col">
    <div>
      <span className="font-semibold">Gate:</span> {flight.gate || '-'}
    </div>
    <div>
      <span className="font-semibold">Check-in:</span> {flight.checkIn || '-'}
    </div>
  </div>
</div>

      </div>
    </>
  );
}

// --- Main Table Component ---
export function FlightTable() {
  const [flights, setFlights] = useState<ProcessedData>({
    departures: [],
    arrivals: [],
  });
  const [activeTab, setActiveTab] = useState<'departures' | 'arrivals'>(
    'departures'
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/fetchFlights');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFlights(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching flights:', err);
      setError(
        `Failed to load flight data: ${
          err instanceof Error ? err.message : 'Unknown error'
        }. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlightData();
    const refreshInterval = setInterval(fetchFlightData, 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [fetchFlightData]);

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((prev) => (prev === 'departures' ? 'arrivals' : 'departures'));
    }, 20 * 1000);
    return () => clearInterval(tabInterval);
  }, []);

  const isFlightRecent = (flightTime: string, flightStatus: string): boolean => {
    const status = flightStatus.toLowerCase();
    if (status === STATUS_DEPARTED || status === STATUS_ARRIVED) {
      return false;
    }
    return true;
  };

  const filteredDepartures = flights.departures.filter((flight) =>
    isFlightRecent(flight.actual_out, flight.status)
  );
  const filteredArrivals = flights.arrivals.filter((flight) =>
    isFlightRecent(flight.actual_out, flight.status)
  );

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <p className="text-red-700 dark:text-red-400">{error}</p>
        <button
          onClick={fetchFlightData}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 w-[90vw] max-w-full mx-auto">
      <FlightTableHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile cards */}
      <div className="md:hidden">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-32 bg-gray-200 rounded mb-4 dark:bg-gray-700"
            ></div>
          ))
        ) : activeTab === 'departures' ? (
          filteredDepartures.length > 0 ? (
            filteredDepartures.map((flight, idx) => (
              <FlightCard key={flight.ident + idx} flight={flight} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No departures found.
            </p>
          )
        ) : filteredArrivals.length > 0 ? (
          filteredArrivals.map((flight, idx) => (
            <FlightCard key={flight.ident + idx} flight={flight} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No arrivals found.
          </p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className={thClassNames}>
                Airline
              </th>
              <th scope="col" className={`${thClassNames} font-bold`}>
                {activeTab === 'departures' ? 'Destination' : 'Origin'}
              </th>
              <th scope="col" className={thClassNames}>
                Scheduled
              </th>
              <th scope="col" className={thClassNames}>
                Estimated
              </th>
              <th scope="col" className={thClassNames}>
                Actual
              </th>
              <th scope="col" className={thClassNames}>
                Terminal
              </th>
              <th scope="col" className={thClassNames}>
                Gate
              </th>
              <th scope="col" className={thClassNames}>
                Check-in
              </th>
              <th scope="col" className={thClassNames}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 9 }).map((__, colIndex) => (
                    <td key={colIndex} className="px-4 py-4">
                      <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : activeTab === 'departures' ? (
              filteredDepartures.length > 0 ? (
                filteredDepartures.map((flight, index) => (
                <FlightRow
  key={`${flight.ident}-${flight.destination.code}-${index}`}
  flight={flight}
  index={index}
  activeTab={activeTab}  // Pass activeTab here
/>

                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No departures found.
                  </td>
                </tr>
              )
            ) : filteredArrivals.length > 0 ? (
              filteredArrivals.map((flight, index) => (
               <FlightRow
  key={`${flight.ident}-${flight.destination.code}-${index}`}
  flight={flight}
  index={index}
  activeTab={activeTab}  // Pass activeTab here
/>

              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No arrivals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <div>
          {!loading &&
            `Showing ${
              activeTab === 'departures'
                ? filteredDepartures.length
                : filteredArrivals.length
            } ${activeTab}`}
        </div>
        <div>Auto-switching tabs every 20 seconds</div>
      </div>
    </div>
  );
}
