import React from 'react';
import { FlightStatistics } from '../../utils/fetchFlightsStatistics';
import Link from 'next/link';
import { FaArrowLeft, FaPlaneArrival, FaPlaneDeparture, FaClock, FaChartBar, FaPlane } from 'react-icons/fa';

interface FlightStatisticsProps {
  statistics: FlightStatistics;
  isStandalone?: boolean;
}

const FlightStatisticsComponent: React.FC<FlightStatisticsProps> = ({
  statistics,
  isStandalone = false
}) => {
  const {
    totalFlights,
    arrivalCount,
    departureCount,
    onTimePercentage,
    delayedCount,
    cancelledCount,
    airlineDistribution,
    destinationDistribution,
    originDistribution,
    statusDistribution,
    hourlyDistribution
  } = statistics;

  const renderDistribution = (items: Array<{ name: string; value?: number; count?: number; percentage?: number }>, limit?: number) => {
    const displayItems = limit ? items.slice(0, limit) : items;
    return (
      <ul className="space-y-3">
        {displayItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-2 px-1 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded">
            <span className="font-medium text-gray-700 dark:text-gray-300 truncate pr-2">{item.name}</span>
            <span className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {item.value ?? item.count ?? 0}
              </span>
              {item.percentage !== undefined && (
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  ({item.percentage}%)
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  };

return (
  <>
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        {!isStandalone && (
          <Link
            href="/flight-statistics"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm transition-colors"
          >
            Open Full Statistics
          </Link>
        )}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Flight Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Main Statistics */}
        <div className="statistics-card p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800/70">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-3">
              <FaChartBar className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="stat-item p-3 rounded-lg bg-white/70 dark:bg-blue-500 backdrop-blur-sm">
              <span className="stat-label text-xs font-medium text-gray-500 dark:text-white">Total Flights</span>
              <span className="stat-value block text-xl font-bold text-gray-900 dark:text-white mt-1">{totalFlights}</span>
            </div>
            <div className="stat-item p-3 rounded-lg bg-white/70 dark:bg-orange-300/90 backdrop-blur-sm">
              <span className="stat-label text-xs font-medium text-gray-500 dark:text-black">Arrivals</span>
              <span className="stat-value block text-xl font-bold text-gray-900 dark:text-blue-900 mt-1">{arrivalCount}</span>
            </div>
            <div className="stat-item p-3 rounded-lg bg-white/70 dark:bg-green-500 backdrop-blur-sm">
              <span className="stat-label text-xs font-medium text-gray-900 dark:text-black-400">Departures</span>
              <span className="stat-value block text-xl font-bold text-gray-900 dark:text-white mt-1">{departureCount}</span>
            </div>
            <div className="stat-item p-3 rounded-lg bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm">
              <span className="stat-label text-xs font-medium text-gray-500 dark:text-gray-400">On Time</span>
              <span className="stat-value block text-xl font-bold text-gray-900 dark:text-white mt-1">{onTimePercentage}%</span>
            </div>
            <div className="stat-item p-3 rounded-lg bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm">
              <span className="stat-label text-xs font-medium text-gray-500 dark:text-gray-400">Delayed</span>
              <span className="stat-value block text-xl font-bold text-gray-900 dark:text-white mt-1">{delayedCount}</span>
            </div>
            <div className="stat-item p-3 rounded-lg bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm">
              <span className="stat-label text-xs font-medium text-gray-500 dark:text-gray-400">Cancelled</span>
              <span className="stat-value block text-xl font-bold text-gray-900 dark:text-white mt-1">{cancelledCount}</span>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="statistics-card p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-800/70">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mr-3">
              <FaPlane className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Flight Status</h3>
          </div>
          {renderDistribution(statusDistribution)}
        </div>

        {/* Top Airlines */}
        <div className="statistics-card p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-800/70">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-3">
              <FaPlane className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Top Airlines</h3>
          </div>
          {renderDistribution(airlineDistribution)}
        </div>

        {/* Top Destinations */}
        <div className="statistics-card p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-800/70">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 mr-3">
              <FaPlaneArrival className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Top Destinations</h3>
          </div>
          {renderDistribution(destinationDistribution)}
        </div>

        {/* Top Origins */}
        <div className="statistics-card p-5 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-800/70">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 mr-3">
              <FaPlaneDeparture className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Top Origins</h3>
          </div>
          {renderDistribution(originDistribution)}
        </div>

        {/* Hourly Distribution */}
        <div className="statistics-card p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-800/70 col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mr-3">
              <FaClock className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Hourly Traffic</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {hourlyDistribution.map((hourData) => (
              <div key={hourData.hour} className="hourly-item p-3 rounded-lg bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm">
                <span className="block text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {hourData.hour}:00
                </span>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Arrivals</span>
                      <span>{hourData.arrivals}</span>
                    </div>
                    <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 dark:bg-green-600"
                        style={{ width: `${(hourData.arrivals / Math.max(1, arrivalCount)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Departures</span>
                      <span>{hourData.departures}</span>
                    </div>
                    <div className="w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 dark:bg-blue-600"
                        style={{ width: `${(hourData.departures / Math.max(1, departureCount)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  </>
);
};

export default FlightStatisticsComponent;