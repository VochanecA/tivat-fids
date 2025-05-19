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
  isLoading?: boolean; // Add loading status prop
}

function FlightRowComponent({ flight, index = 0, activeTab, isLoading = false }: FlightRowProps) {
  // Keep track of the previous flight data to avoid flickering during updates
  const [prevFlight, setPrevFlight] = useState<Flight | null>(null);
  const [blinkClass, setBlinkClass] = useState('');
  
  // Save flight data when it first loads or changes significantly
  useEffect(() => {
    if (!isLoading && flight) {
      setPrevFlight(flight);
    }
  }, [flight, isLoading]);
  
  // Use previous flight data during loading to prevent flickering
  const displayFlight = useMemo(() => {
    // If we're loading and have previous data, use that
    if (isLoading && prevFlight) {
      return prevFlight;
    }
    // Otherwise use current flight data
    return flight;
  }, [flight, prevFlight, isLoading]);

useEffect(() => {
  if (displayFlight.status === 'Processing') {
    setBlinkClass('blink-slow');
  } else if (displayFlight.status === 'Boarding') {
    setBlinkClass('blink-slow');
  } else if (
    displayFlight.status === 'Delay' ||
    displayFlight.status === 'Diverted' ||
    displayFlight.status === 'Closed'  // Added Closed here
  ) {
    setBlinkClass('blink-fast');
  } else if (displayFlight.status === 'Earlier') {
    setBlinkClass('blink-earlier');
  } else {
    setBlinkClass('');
  }
}, [displayFlight.status]);



  type StatusKey =
    | 'Processing'
    | 'Boarding'
    | 'Final Call'
    | 'Departed'
    | 'Arrived'
    | 'Closed'
    | 'Delay'
    | 'Diverted'
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
        bgClass: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500 dark:text-black dark:border-yellow-500',
        iconClass: 'text-yellow-500 dark:text-yellow-400',
        animation: 'blink-slow'
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
  bgClass: 'bg-orange-400 text-black border-slate-200 dark:bg-orange-500 dark:text-black dark:border-slate-800',
  iconClass: 'text-black dark:text-black'
},

      'Delay': {
        bgClass: 'bg-orange-500 text-white border-orange-600 dark:bg-orange-600 dark:text-white dark:border-orange-700',
        iconClass: 'text-orange-100 dark:text-orange-100',
        animation: 'blink-fast'
      },
      'Diverted': {
        bgClass: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-50 dark:border-red-800',
        iconClass: 'text-red-500 dark:text-red-400',
        animation: 'blink-slow'
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
        bgClass: 'bg-red-500 text-white border-red-600 dark:bg-red-600 dark:text-white dark:border-red-700',
        iconClass: 'text-red-100 dark:text-red-100'
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

    const key = (displayFlight.status in configs ? displayFlight.status : 'default') as StatusKey;
    return configs[key];
  }, [displayFlight.status]);

  const terminalStyle = useMemo(() => {
    const t = displayFlight.Terminal?.toUpperCase() || '';
    if (t === 'T02' || t === 'T2') return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
    if (t === 'T01' || t === 'T1') return 'bg-gradient-to-r from-amber-400 to-amber-500 text-black';
    return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200';
  }, [displayFlight.Terminal]);

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

  // Add subtle loading indicator overlay for the row itself if updating
  const loadingOverlay = isLoading && prevFlight ? 
    'relative after:absolute after:inset-0 after:bg-gray-100/10 after:dark:bg-gray-800/10' : '';

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

      <tr className={`${rowBgClass} ${loadingOverlay} border-b border-gray-200 dark:border-gray-700`}>
        {/* Airline info column */}
        <td className="py-4 px-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AirlineLogo name={displayFlight.KompanijaNaziv} icao={displayFlight.KompanijaICAO} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{displayFlight.KompanijaNaziv}</div>
              <a
                href={`https://www.flightaware.com/live/flight/${displayFlight.KompanijaICAO}${displayFlight.ident}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 no-underline hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                title="View on FlightAware"
              >
                {displayFlight.Kompanija}{displayFlight.ident}
              </a>
            </div>
          </div>
        </td>

        {/* Destination column */}
        <td className="py-4 px-4">
          <div className="flex items-center">
            <MapPin size={20} className="mr-2 text-orange-500 dark:text-orange-400" />
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{displayFlight.grad}</div>
              <div className="text-sm font-medium text-orange-700/70 dark:text-orange-500/80">
                {displayFlight.TipLeta === 'O' ? displayFlight.destination.code : displayFlight.origin.code}
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
              <div className="text-xl font-bold">{displayFlight.scheduled_out}</div>
            </div>
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-blue-500" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {/* <div className="font-medium">Estimated</div> */}
              <div className={`text-xl font-bold ${displayFlight.estimated_out ? 'blink-earlier' : ''}`}>
                {displayFlight.estimated_out || ''}
              </div>
            </div>
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="flex items-center">
            <ArrowRight size={16} className="mr-2 text-blue-500" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {/* <div className="font-medium">Actual</div> */}
              <div className="text-xl font-bold">{displayFlight.actual_out || ''}</div>
            </div>
          </div>
        </td>

        {/* Terminal column */}
        <td className="py-4 px-4">
          <div className="flex flex-col items-center justify-center">
            {displayFlight.Terminal ? (
              <div className={`${terminalStyle} px-3 py-1 rounded-full text-sm font-medium flex items-center justify-center w-12`}>
                {displayFlight.Terminal}
              </div>
            ) : (
              <span className="text-gray-400 dark:text-gray-600">—</span>
            )}
          </div>
        </td>

        {/* Gate column */}
 <td className="py-4 px-4">
  <div className="flex items-center justify-center">
    <DoorClosed size={16} className="mr-1 text-blue-500 dark:text-blue-400" />
    {displayFlight.gate ? (
      <span className="inline-block px-3 py-1 rounded-full text-xl font-semibold bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 transition-colors">
        {displayFlight.gate}
      </span>
    ) : (
      <span className="text-gray-400 dark:text-gray-600">-</span>
    )}
  </div>
</td>


        {/* Check-in column */}
<td className="py-4 px-4 text-center">
  {displayFlight.checkIn ? (
    <span className="inline-block px-3 py-1 rounded-full text-xl font-semibold bg-green-100 text-green-700 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 transition-colors">
      {displayFlight.checkIn}
    </span>
  ) : (
    <span className="text-gray-400 dark:text-gray-600">-</span>
  )}
</td>



        {/* Status column */}
        <td className="py-4 px-4">
          <div className="flex justify-center">
            {displayFlight.status === 'Earlier' ? (
              <span 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700 blink-earlier"
              >
                <AlertTriangle size={14} className="mr-1" />
                {displayFlight.status}
              </span>
            ) : (
              <span 
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig.bgClass} ${statusConfig.animation || ''}`}
              >
                {displayFlight.status}
              </span>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export const FlightRow = React.memo(FlightRowComponent);