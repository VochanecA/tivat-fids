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
      <ul className="space-y-2">
        {displayItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
            <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
            <span className="text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {item.value ?? item.count ?? 0}
              </span>
              {item.percentage !== undefined && ` (${item.percentage}%)`}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flight-statistics bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        {!isStandalone && (
          <Link
            href="/flight-statistics"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm"
          >
            Open Full Statistics
          </Link>
        )}
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Flight Statistics</h2>

      <div className="statistics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Statistics */}
        <div className="statistics-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 mr-2">
              <FaChartBar className="mr-1" /> Overview
            </span>
          </h3>
          <div className="stats-grid grid grid-cols-2 gap-4">
            <div className="stat-item bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <span className="stat-label text-sm text-gray-600 dark:text-gray-300">Total Flights</span>
              <span className="stat-value block text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalFlights}</span>
            </div>
            <div className="stat-item bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <span className="stat-label text-sm text-gray-600 dark:text-gray-300">Arrivals</span>
              <span className="stat-value block text-2xl font-bold text-gray-900 dark:text-white mt-1">{arrivalCount}</span>
            </div>
            <div className="stat-item bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <span className="stat-label text-sm text-gray-600 dark:text-gray-300">Departures</span>
              <span className="stat-value block text-2xl font-bold text-gray-900 dark:text-white mt-1">{departureCount}</span>
            </div>
            <div className="stat-item bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <span className="stat-label text-sm text-gray-600 dark:text-gray-300">On Time</span>
              <span className="stat-value block text-2xl font-bold text-gray-900 dark:text-white mt-1">{onTimePercentage}%</span>
            </div>
            <div className="stat-item bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <span className="stat-label text-sm text-gray-600 dark:text-gray-300">Delayed</span>
              <span className="stat-value block text-2xl font-bold text-gray-900 dark:text-white mt-1">{delayedCount}</span>
            </div>
            <div className="stat-item bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
              <span className="stat-label text-sm text-gray-600 dark:text-gray-300">Cancelled</span>
              <span className="stat-value block text-2xl font-bold text-gray-900 dark:text-white mt-1">{cancelledCount}</span>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="statistics-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 mr-2">
              <FaPlane className="mr-1" /> Flight Status
            </span>
          </h3>
          {renderDistribution(statusDistribution)}
        </div>

        {/* Top Airlines */}
        <div className="statistics-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 mr-2">
              <FaPlane className="mr-1" /> Top Airlines
            </span>
          </h3>
          {renderDistribution(airlineDistribution)}
        </div>

        {/* Top Destinations */}
        <div className="statistics-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 mr-2">
              <FaPlaneArrival className="mr-1" /> Top Destinations
            </span>
          </h3>
          {renderDistribution(destinationDistribution)}
        </div>

        {/* Top Origins */}
        <div className="statistics-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 mr-2">
              <FaPlaneDeparture className="mr-1" /> Top Origins
            </span>
          </h3>
          {renderDistribution(originDistribution)}
        </div>

        {/* Hourly Distribution */}
        <div className="statistics-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 mr-2">
              <FaClock className="mr-1" /> Hourly Traffic
            </span>
          </h3>
          <div className="hourly-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hourlyDistribution.map((hourData) => (
              <div key={hourData.hour} className="hourly-item bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm">
                <span className="hour block text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {hourData.hour}:00
                </span>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-12">Arrivals:</span>
                  <div className="flex-1 h-4 bg-green-100 dark:bg-green-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 dark:bg-green-600"
                      style={{ width: `${(hourData.arrivals / Math.max(1, arrivalCount)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{hourData.arrivals}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-12">Departures:</span>
                  <div className="flex-1 h-4 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 dark:bg-blue-600"
                      style={{ width: `${(hourData.departures / Math.max(1, departureCount)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{hourData.departures}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightStatisticsComponent;
