'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FlightRow } from './flight-row';
import { FaPlaneArrival, FaHome, FaPlaneDeparture } from 'react-icons/fa';
import { AirlineLogo } from './airline-logo';
import Link from 'next/link';

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

// Helper functions for blink and status/terminal classes
function useBlink(status: string) {
  if (status === 'Delayed') return 'blink-slow';
  if (status === 'Cancelled') return 'blink-fast';
  return '';
}

function getStatusClass(status: string) {
  switch (status) {
    case 'Arrived': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
    case 'Delayed': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
    case 'Scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

function getTerminalClass(terminal: string) {
  switch (terminal) {
    case 'A': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200';
    case 'B': return 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-200';
    case 'C': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

function Clock() {
  const [time, setTime] = React.useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xl font-inter font-semibold text-red-600 dark:text-white select-none">
      {time}
    </div>
  );
}

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
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1">Scheduled</div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">{flight.scheduled_out}</div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1">Estimated</div>
            <div className={`font-semibold ${blinkClass} text-gray-800 dark:text-gray-200`}>
              {flight.estimated_out || '—'}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1">Actual</div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">{flight.actual_out || '—'}</div>
          </div>
        </div>
        {/* Info Row with Pills */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
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

export default function ArrivalsTable() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllArrived, setShowAllArrived] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/fetchFlights');
      if (!res.ok) throw new Error('Failed to fetch flights');
      const data = await res.json();
      setFlights((data.arrivals || []).filter((f: Flight) => f.TipLeta === 'I'));
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to load arrivals.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 120_000);
    return () => clearInterval(interval);
  }, [fetchFlights]);

  const arrivedFlights = flights.filter(f => f.status === 'Arrived');
  const nonArrivedFlights = flights.filter(f => f.status !== 'Arrived');
  const sortByEstimated = (a: Flight, b: Flight) =>
    new Date(a.estimated_out).getTime() - new Date(b.estimated_out).getTime();
  const sortedArrived = [...arrivedFlights].sort(sortByEstimated);
  const sortedNonArrived = [...nonArrivedFlights].sort(sortByEstimated);
  const visibleArrived = showAllArrived ? sortedArrived : sortedArrived.slice(-2);
  const visibleFlights = [...visibleArrived, ...sortedNonArrived];

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 w-[90vw] max-w-full mx-auto flex flex-col min-h-screen">

      {/* HEADER: Responsive, mobile-friendly */}
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/90 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3">
        {/* Left: Clock */}
        <div className="flex items-center gap-2 md:mr-4">
          <Clock />
        </div>
        {/* Center: Title */}
        <h2 className="mt-2 md:mt-0 text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-blue-300 text-center w-full md:w-auto">
          Arrivals <span className="hidden sm:inline">:: Dolasci</span>
        </h2>
        {/* Right: Desktop Buttons */}
        {arrivedFlights.length > 2 && (
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <button
              className="px-4 py-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              onClick={() => setShowAllArrived(v => !v)}
            >
              {showAllArrived ? 'Hide earlier Arrived Flights' : 'Show all Arrived Flights'}
            </button>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded bg-gray-100 dark:bg-green-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              aria-label="Back to Home"
            >
              <FaHome className="mr-2 h-5 w-5" />
              Home
            </Link>
          </div>
        )}
      </header>

      {/* MOBILE: Flight Cards */}
      <div className="block md:hidden flex-1">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : visibleFlights.length === 0 ? (
          <div className="text-center py-8">No arrivals found.</div>
        ) : (
          visibleFlights.map((flight, idx) => (
            <FlightCard key={flight.ident + idx} flight={flight} />
          ))
        )}
      </div>

      {/* DESKTOP: Table */}
      <div className="overflow-x-auto hidden md:block flex-grow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2">Airline</th>
              <th className="px-4 py-2">Destination</th>
              <th className="px-4 py-2">Scheduled</th>
              <th className="px-4 py-2">Estimated</th>
              <th className="px-4 py-2">Actual</th>
              <th className="px-4 py-2">Terminal</th>
              <th className="px-4 py-2">Gate</th>
              <th className="px-4 py-2">Check-in</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-8">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={9} className="text-center text-red-600 py-8">{error}</td>
              </tr>
            ) : visibleFlights.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8">No arrivals found.</td>
              </tr>
            ) : (
              visibleFlights.map((flight, idx) => (
                <FlightRow
                  key={flight.ident + idx}
                  flight={flight}
                  index={idx}
                  activeTab="arrivals"
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE: Fixed bottom buttons */}
      {arrivedFlights.length > 2 && (
        <div className="fixed inset-x-0 bottom-0 z-20 md:hidden bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-800 flex justify-center gap-3 px-4 py-3">
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => setShowAllArrived(v => !v)}
          >
            <FaPlaneArrival />
            {showAllArrived ? 'Hide Arrived' : 'Show all Arrived'}
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
            aria-label="Back to Home"
          >
            <FaHome />
            Home
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-3 px-4 flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
        <div>
          Last update time:{' '}
          {lastUpdate
            ? lastUpdate.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            : '—'}
        </div>
        <div>Code by Alen, all rights reserved 2025</div>
      </footer>
    </div>
  );
}
