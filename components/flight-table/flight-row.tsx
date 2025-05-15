import React, { useEffect, useState, useMemo } from 'react';
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
  activeTab: 'arrivals' | 'departures';  // Add activeTab prop here
}

function FlightRowComponent({ flight, index = 0, activeTab }: FlightRowProps) {
  const [blinkClass, setBlinkClass] = useState('');

  useEffect(() => {
    if (flight.status === 'Processing') {
      setBlinkClass('blink-slow');
    } else if (flight.status === 'Delay') {
      setBlinkClass('blink-fast');
    } else {
      setBlinkClass('');
    }
  }, [flight.status]);

  const statusClass = useMemo(() => {
    switch (flight.status) {
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
  }, [flight.status]);

  const terminalClass = useMemo(() => {
    const t = flight.Terminal?.toUpperCase() || '';
    if (t === 'T02' || t === 'T2') return 'bg-red-600 text-white';
    if (t === 'T01' || t === 'T1') return 'bg-yellow-400 text-black';
    return '';
  }, [flight.Terminal]);

  // Alternate row colors depending on activeTab
const rowBgClass = useMemo(() => {
  if (activeTab === 'arrivals') {
    return index % 2 === 0
      ? 'bg-white dark:bg-gray-900'
      : 'bg-gray-100 dark:bg-[rgba(10,25,70,0.95)]'; // light grey in light mode, very dark blue in dark mode
  } else {
    return index % 2 === 0
      ? 'bg-white dark:bg-gray-900'
      : 'bg-gray-100 dark:bg-[rgba(35,0,35,0.95)]'; // light grey in light mode, very dark magenta in dark mode
  }
}, [activeTab, index]);





  const blinkStyle = useMemo(() => ({
    padding: '0.25rem 0.75rem',
    margin: '0 0.25rem',
    minWidth: '2.5rem',
    height: '2rem',
  }), []);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink-slow {
          animation: blink 2s infinite;
          animation-fill-mode: both;
        }
        .blink-fast {
          animation: blink 0.4s infinite;
          animation-fill-mode: both;
        }
        @media (max-width: 640px) {
          tr {
            display: block;
            margin-bottom: 1rem;
            border-bottom: 2px solid #e5e7eb;
          }
          tr:nth-child(even) {
            background-color: transparent !important;
          }
          td {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem !important;
            text-align: right;
            font-size: 0.875rem;
            border-bottom: 1px solid #e5e7eb;
          }
          td:last-child {
            border-bottom: 0;
          }
          td::before {
            content: attr(data-label);
            font-weight: 600;
            text-transform: uppercase;
            color: #6b7280;
            flex-basis: 50%;
            text-align: left;
          }
          .inline-flex {
            font-size: 0.875rem !important;
            padding: 0.25rem 0.75rem !important;
            min-width: 2.5rem !important;
            height: 2rem !important;
          }
          .text-xl {
            font-size: 1rem !important;
          }
        }
      `}</style>

      <tr className={rowBgClass}>
        <td className="px-4 py-4 whitespace-nowrap" data-label="Airline">
          <div className="flex items-center space-x-3">
            <AirlineLogo name={flight.KompanijaNaziv} icao={flight.KompanijaICAO} />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{flight.KompanijaNaziv}</div>
              <a
                href={`https://www.flightaware.com/live/flight/${flight.KompanijaICAO}${flight.ident}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-500 dark:text-yellow-300 no-underline hover:text-orange-500 transition-colors"
                title="View on FlightAware"
                tabIndex={0}
              >
                {flight.Kompanija}{flight.ident}
              </a>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 whitespace-nowrap" data-label="City">
          <div className="text-2xl font-bold text-red-600 dark:text-orange-400">{flight.grad}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {flight.TipLeta === 'O' ? flight.destination.code : flight.origin.code}
          </div>
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-blue-400" data-label="Scheduled">
          {flight.scheduled_out}
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-blue-400" data-label="Estimated">
          {flight.estimated_out}
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-green-400" data-label="Actual">
          {flight.actual_out}
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" data-label="Terminal">
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
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" data-label="Gate">
          {flight.gate || '-'}
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" data-label="Check-In">
          {flight.checkIn || '-'}
        </td>

        <td className="px-4 py-4 whitespace-nowrap" data-label="Status">
          <span
            className={`inline-flex font-semibold rounded-full ${statusClass} ${blinkClass}`}
            style={blinkStyle}
            title={`Status: ${flight.status}`}
          >
            {flight.status}
          </span>
        </td>
      </tr>
    </>
  );
}

export const FlightRow = React.memo(FlightRowComponent);
