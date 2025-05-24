'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FlightTableHeader } from './flight-table-header';
import { FlightRow as OriginalFlightRow } from './flight-row';
import { AirlineLogo } from './airline-logo';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaDoorOpen } from 'react-icons/fa';

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
  'px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider dark:text-gray-400';

// Narrower Terminal column class
const thTerminalClassNames =
  'px-2 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider dark:text-gray-400';

const FlightRow = React.memo(OriginalFlightRow);


// --- Pills and blink helpers ---
function getStatusClass(status: string) {
  switch (status) {
    case 'Processing':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-green-800 text-green-50 dark:bg-green-800 dark:text-green-100';
    case 'Diverted':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-red-600 text-white dark:bg-red-700 dark:text-red-50';
    case 'Boarding':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border bg-green-100 text-green-800 dark:bg-yellow-400 dark:text-black';
    case 'Earlier':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border bg-blue-400 text-black dark:bg-blue-500 dark:text-black';
    case 'Final Call':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'Departed':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Arrived':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Closed':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Delay':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-red-500 text-red-50 dark:bg-red-500 dark:text-red-50';
    case 'On time':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-200';
    case 'Cancelled':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-red-600 text-white dark:bg-red-700 dark:text-red-200';
    case 'Scheduled':
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-blue-50';
    default:
      return 'inline-flex items-center justify-center text-center px-3 py-1 text-xs font-semibold rounded border  bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
    else if (status === 'Diverted') setBlinkClass('blink-slow');
    else if (status === 'Boarding') setBlinkClass('blink-fast');
    else if (status === 'Cancelled') setBlinkClass('blink-slow');
    else if (status === 'Earlier') setBlinkClass('blink-slow');
    else if (status === 'Closed') setBlinkClass('blink-slow');
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
        .flight-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .flight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        .rounded-dark-grey {
          background-color: rgba(75, 85, 99, 0.25); /* Dark grey with transparency */
          border-radius: 0.5rem; /* Rounded corners */
          padding: 0.5rem; /* Padding inside the rounded rectangle */
          margin: 0.12rem; /* Margin outside the rounded rectangle */
        }
      `}</style>

      <div className="flight-card block md:hidden bg-white/90 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur rounded-2xl p-5 mb-5 shadow-md">
        {/* Header: Airline + Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <AirlineLogo name={flight.KompanijaNaziv} icao={flight.KompanijaICAO} />
            <div>
              <div className="font-semibold text-base text-gray-800 dark:text-gray-100">{flight.KompanijaNaziv}</div>
              <a
                href={`https://www.flightaware.com/live/flight/${flight.KompanijaICAO}${flight.ident}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {flight.Kompanija}{flight.ident}
              </a>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass} ${blinkClass}`}
            style={{ minWidth: '80px' }}
          >
            {flight.status}
          </span>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-3">
          {flight.TipLeta === 'O' ? <FaPlaneDeparture className="text-orange-500" /> : <FaPlaneArrival className="text-green-500" />}
          <span>{flight.grad}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ({flight.TipLeta === 'O' ? flight.destination.code : flight.origin.code})
          </span>
        </div>

        {/* Times Grid */}
        <div className="grid grid-cols-3 text-center text-sm mb-4">
          <div className="rounded-dark-grey">
            <div className="text-gray-500 dark:text-gray-400 mb-1">Scheduled</div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">{flight.scheduled_out}</div>
          </div>
          <div className="rounded-dark-grey">
            <div className="text-gray-500 dark:text-gray-400 mb-1">Estimated</div>
            <div className={`font-semibold ${blinkClass} text-gray-800 dark:text-gray-200`}>
              {flight.estimated_out || '—'}
            </div>
          </div>
          <div className="rounded-dark-grey">
            <div className="text-gray-500 dark:text-gray-400 mb-1">Actual</div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">{flight.actual_out || '—'}</div>
          </div>
        </div>

        {/* Info Row with Pills */}
        <div className="flex justify-between items-center">
          <div className="">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Terminal</div>
            {flight.Terminal ? (
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${terminalClass}`}>
                {flight.Terminal}
              </div>
            ) : (
              <span className="text-gray-400 dark:text-gray-600">—</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gate</div>
            <div className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm bg-white/60 dark:bg-white/10 text-gray-800 dark:text-gray-200 shadow-sm">
              {flight.gate || '—'}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Check-in</div>
            <div className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm bg-white/60 dark:bg-white/10 text-gray-800 dark:text-gray-200 shadow-sm">
              {flight.checkIn || '—'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// --- Search Helper ---
function matchesSearch(flight: Flight, search: string) {
  const s = search.trim().toLowerCase();
  if (!s) return true;
  return (
    flight.ident.toLowerCase().includes(s) ||
    (flight.grad && flight.grad.toLowerCase().includes(s)) ||
    (flight.Kompanija && flight.Kompanija.toLowerCase().includes(s)) ||
    (flight.KompanijaNaziv && flight.KompanijaNaziv.toLowerCase().includes(s)) ||
    (flight.origin?.code && flight.origin.code.toLowerCase().includes(s)) ||
    (flight.destination?.code && flight.destination.code.toLowerCase().includes(s))
  );
}

// --- Main Table Component ---
export function FlightTable({ onDataUpdate }: { onDataUpdate?: () => void }) {
  const [flights, setFlights] = useState<ProcessedData>({
    departures: [],
    arrivals: [],
  });
  const [activeTab, setActiveTab] = useState<'departures' | 'arrivals'>('departures');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(''); // <-- search state

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
      if (onDataUpdate) {
        onDataUpdate(); // <-- Notify parent!
      }
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
  }, [onDataUpdate]);

  useEffect(() => {
    fetchFlightData(); // initial fetch
    const refreshInterval = setInterval(() => {
      fetchFlightData();
    }, 60 * 1000);
    return () => clearInterval(refreshInterval);
    // eslint-disable-next-line
  }, []); // <--- Only run once on mount!

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((prev) => (prev === 'departures' ? 'arrivals' : 'departures'));
    }, 25 * 1000);
    return () => clearInterval(tabInterval);
  }, []);

  const isFlightRecent = (flightTime: string, flightStatus: string): boolean => {
    const status = flightStatus.toLowerCase();
    if (status === STATUS_DEPARTED || status === STATUS_ARRIVED) {
      return false;
    }
    return true;
  };

  // --- Filtered lists with search ---
const filteredDepartures = flights.departures
  .filter((flight) => isFlightRecent(flight.actual_out, flight.status))
  .filter((flight) => matchesSearch(flight, search));
const filteredArrivals = flights.arrivals
  .filter((flight) => isFlightRecent(flight.actual_out, flight.status))
  .filter((flight) => matchesSearch(flight, search));

  
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

      {/* Search Box */}
{/* Search Box - Only on mobile */}

<div className="md:hidden px-4 pt-4 mb-4">
  <input
    type="text"
    value={search}
    onChange={e => setSearch(e.target.value)}
    placeholder="Search flights (number, city, airline)..."
    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
    aria-label="Search flights"
  />
</div>



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
              {/* Hide Actual column only for departures */}
              {activeTab === 'arrivals' && (
                <th scope="col" className={thClassNames}>
                  Actual
                </th>
              )}
              <th scope="col" className={thTerminalClassNames}>
                Terminal
              </th>
              {/* Show Gate and Check-in only for departures */}
              {activeTab === 'departures' && (
                <>
                  <th scope="col" className={thClassNames}>
                    Gate
                  </th>
                  <th scope="col" className={thClassNames}>
                    Check-in
                  </th>
                </>
              )}
              <th scope="col" className={thClassNames}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {/* Adjust skeleton columns based on activeTab */}
                  {Array.from({ length: activeTab === 'departures' ? 8 : 6 }).map((__, colIndex) => (
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
                    activeTab={activeTab}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
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
                  activeTab={activeTab}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No arrivals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
  <div>
    {!loading &&
      `Showing ${
        activeTab === 'departures'
          ? filteredDepartures.length
          : filteredArrivals.length
      } ${activeTab}`}
  </div>
  <div>Auto-switching tabs every 25 seconds</div>
</div>

      </div>
    </div>
  );
}