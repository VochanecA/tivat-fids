import React, { useEffect, useState, useMemo } from 'react';
import { AirlineLogo } from './airline-logo';
import { Clock, Calendar, ArrowRight, MapPin, DoorClosed, AlertTriangle } from 'lucide-react';

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

function FlightRowComponent({ flight, index = 0, activeTab }: FlightRowProps) {
  const [blinkClass, setBlinkClass] = useState('');

  useEffect(() => {
    if (flight.status === 'Processing') {
      setBlinkClass('blink-slow');
    } else if (flight.status === 'Delay') {
      setBlinkClass('blink-fast');
    } else if (flight.status === 'Earlier') {
      setBlinkClass('blink-earlier');
    } else {
      setBlinkClass('');
    }
  }, [flight.status]);

  type StatusKey =
    | 'Processing'
    | 'Boarding'
    | 'Final Call'
    | 'Departed'
    | 'Arrived'
    | 'Closed'
    | 'Delay'
    | 'Earlier'
    | 'On time'
    | 'Cancelled'
    | 'Scheduled'
    | 'default';

  const statusConfig = useMemo(() => {
    const configs: Record<StatusKey, { bgClass: string; iconClass: string; animation?: string }> = {
      'Processing': {
        bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-800',
        iconClass: 'text-emerald-500 dark:text-emerald-400',
        animation: 'blink-slow'
      },
      'Boarding': {
        bgClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800',
        iconClass: 'text-blue-500 dark:text-blue-400'
      },
      'Final Call': {
        bgClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-800',
        iconClass: 'text-amber-500 dark:text-amber-400'
      },
      'Departed': {
        bgClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900 dark:text-violet-200 dark:border-violet-800',
        iconClass: 'text-violet-500 dark:text-violet-400'
      },
      'Arrived': {
        bgClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-800',
        iconClass: 'text-teal-500 dark:text-teal-400'
      },
      'Closed': {
        bgClass: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800',
        iconClass: 'text-slate-500 dark:text-slate-400'
      },
      'Delay': {
        bgClass: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800',
        iconClass: 'text-red-500 dark:text-red-400',
        animation: 'blink-fast'
      },
      'Earlier': {
        bgClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700',
        iconClass: 'text-blue-500 dark:text-blue-400',
        animation: 'blink-earlier'
      },
      'On time': {
        bgClass: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800',
        iconClass: 'text-green-500 dark:text-green-400'
      },
      'Cancelled': {
        bgClass: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800',
        iconClass: 'text-red-500 dark:text-red-400'
      },
      'Scheduled': {
        bgClass: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-800',
        iconClass: 'text-sky-500 dark:text-sky-400'
      },
      'default': {
        bgClass: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800',
        iconClass: 'text-gray-500 dark:text-gray-400'
      }
    };

    const key = (flight.status in configs ? flight.status : 'default') as StatusKey;
    return configs[key];
  }, [flight.status]);

  const terminalStyle = useMemo(() => {
    const t = flight.Terminal?.toUpperCase() || '';
    if (t === 'T02' || t === 'T2') return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
    if (t === 'T01' || t === 'T1') return 'bg-gradient-to-r from-amber-400 to-amber-500 text-black';
    return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200';
  }, [flight.Terminal]);

  const rowBgClass = useMemo(() => {
    const baseClasses = 'transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800';
    
    if (activeTab === 'arrivals') {
      return index % 2 === 0
        ? `${baseClasses} bg-white dark:bg-gray-900`
        : `${baseClasses} bg-gray-50 dark:bg-gray-900/70`;
    } else {
      return index % 2 === 0
        ? `${baseClasses} bg-white dark:bg-gray-900`
        : `${baseClasses} bg-indigo-50/30 dark:bg-indigo-950/30`;
    }
  }, [activeTab, index]);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        .blink-slow {
          animation: blink 1s infinite ease-in-out;
        }
        .blink-fast {
          animation: blink 0.6s infinite ease-in-out;
        }
        .blink-earlier {
          animation: blink 0.9s infinite ease-in-out;
        }
        
        @media (max-width: 640px) {
          .flight-row-mobile {
            display: grid;
            grid-template-columns: 1fr;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          
          .flight-row-mobile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            background-color: rgba(0,0,0,0.03);
          }
          
          .flight-row-mobile-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0.75rem;
            gap: 0.75rem;
          }
          
          .flight-row-mobile-item {
            display: flex;
            flex-direction: column;
          }
          
          .flight-row-mobile-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            color: #6b7280;
            margin-bottom: 0.25rem;
          }
          
          .flight-row-mobile-value {
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          .flight-row-mobile-fullwidth {
            grid-column: span 2;
          }
        }
      `}</style>

      <tr className={`${rowBgClass} border-b border-gray-200 dark:border-gray-700`}>
        {/* Airline info column */}
        <td className="py-4 px-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AirlineLogo name={flight.KompanijaNaziv} icao={flight.KompanijaICAO} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{flight.KompanijaNaziv}</div>
              <a
                href={`https://www.flightaware.com/live/flight/${flight.KompanijaICAO}${flight.ident}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 no-underline hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                title="View on FlightAware"
              >
                {flight.Kompanija}{flight.ident}
              </a>
            </div>
          </div>
        </td>

        {/* Destination column */}
        <td className="py-4 px-4">
          <div className="flex items-center">
            <MapPin size={20} className="mr-2 text-orange-500 dark:text-orange-400" />
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{flight.grad}</div>
              <div className="text-sm font-medium text-orange-700/70 dark:text-orange-500/80">
                {flight.TipLeta === 'O' ? flight.destination.code : flight.origin.code}
              </div>
            </div>
          </div>
        </td>

        {/* Time columns */}
        <td className="py-4 px-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-blue-500" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {/* <div className="font-medium">Scheduled</div> */}
              <div className="text-xl font-bold">{flight.scheduled_out}</div>
            </div>
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-blue-500" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {/* <div className="font-medium">Estimated</div> */}
              <div className={`text-xl font-bold ${flight.estimated_out ? 'blink-earlier' : ''}`}>
                {flight.estimated_out || ''}
              </div>
            </div>
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="flex items-center">
            <ArrowRight size={16} className="mr-2 text-blue-500" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {/* <div className="font-medium">Actual</div> */}
              <div className="text-xl font-bold">{flight.actual_out  ? 'blink-earlier' : ''}</div>
            </div>
          </div>
        </td>

        {/* Terminal column */}
        <td className="py-4 px-4">
          <div className="flex flex-col items-center justify-center">
            {flight.Terminal ? (
              <div className={`${terminalStyle} px-3 py-1 rounded-full text-sm font-medium flex items-center justify-center w-12`}>
                {flight.Terminal}
              </div>
            ) : (
              <span className="text-gray-400 dark:text-gray-600">—</span>
            )}
          </div>
        </td>

        {/* Gate column */}
        <td className="py-4 px-4">
          <div className="flex items-center justify-center">
            <DoorClosed size={16} className="mr-1 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {flight.gate || '—'}
            </span>
          </div>
        </td>

        {/* Check-in column */}
        <td className="py-4 px-4 text-center">
          <span className="inline-block py-1 px-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
            {flight.checkIn || '—'}
          </span>
        </td>

        {/* Status column */}
        <td className="py-4 px-4">
          <div className="flex justify-center">
            {flight.status === 'Earlier' ? (
              <span 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700 blink-earlier"
              >
                <AlertTriangle size={14} className="mr-1" />
                {flight.status}
              </span>
            ) : (
              <span 
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig.bgClass} ${statusConfig.animation || ''}`}
              >
                {flight.status}
              </span>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export const FlightRow = React.memo(FlightRowComponent);