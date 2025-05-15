import { cn } from '@/lib/utils';
import { FlightType } from '@/types/flight';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

interface FlightTableHeaderProps {
  activeTab: FlightType;
  onTabChange: (tab: FlightType) => void;
}

export function FlightTableHeader({ activeTab, onTabChange }: FlightTableHeaderProps) {
  return (
    <>
      {/* Add the CSS animation for the blinking effect */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.0;
            transform: scale(0.9);
          }
        }
        .blink-circle {
          animation: pulse 1s infinite;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background-color: #10b981; /* green-500 */
          display: inline-block;
          margin-right: 8px;
        }
      `}</style>

      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={cn(
            "flex items-center space-x-1 px-2 py-1 text-base sm:px-4 sm:py-2 sm:text-lg font-bold focus:outline-none transition-colors",
            activeTab === 'departures'
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => onTabChange('departures')}
          aria-current={activeTab === 'departures' ? 'page' : undefined}
        >
          {activeTab === 'departures' && <span className="blink-circle" aria-hidden="true"></span>}
          <FaPlaneDeparture className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          <span>Departures</span>
        </button>
        <button
          className={cn(
            "flex items-center space-x-1 px-2 py-1 text-base sm:px-4 sm:py-2 sm:text-lg font-medium focus:outline-none transition-colors",
            activeTab === 'arrivals'
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => onTabChange('arrivals')}
          aria-current={activeTab === 'arrivals' ? 'page' : undefined}
        >
          {activeTab === 'arrivals' && <span className="blink-circle" aria-hidden="true"></span>}
          <FaPlaneArrival className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          <span>Arrivals</span>
        </button>
      </div>
    </>
  );
}