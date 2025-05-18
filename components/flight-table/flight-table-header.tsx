import { cn } from '@/lib/utils';
import { FlightType } from '@/types/flight';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

interface FlightTableHeaderProps {
  activeTab: FlightType;
  onTabChange: (tab: FlightType) => void;
}

export function FlightTableHeader({ activeTab, onTabChange }: FlightTableHeaderProps) {
  return (
    <nav
      role="tablist"
      aria-label="Flight table tabs"
      className="flex border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-md shadow-inner"
    >
      {['departures', 'arrivals'].map((tab) => {
        const isActive = activeTab === tab;
        const label = tab.charAt(0).toUpperCase() + tab.slice(1);

        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab as FlightType)}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 font-semibold rounded-t-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              isActive
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400",
              "flex-1 w-1/2" // Equal width 50% on mobile, flex-grow on bigger screens
            )}
          >
<>
  <span
    aria-hidden="true"
    className={cn(
      "inline-block rounded-full w-2.5 h-2.5 bg-green-500",
      isActive ? "pulse-fast" : "opacity-0"
    )}
  ></span>

  <style jsx>{`
    @keyframes pulseFast {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .pulse-fast {
      animation: pulseFast 2s infinite;
    }
  `}</style>
</>


            {tab === 'departures' ? (
              <FaPlaneDeparture className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            ) : (
              <FaPlaneArrival className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            )}
            <span className="text-sm sm:text-base">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
