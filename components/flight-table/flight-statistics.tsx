'use client';

import { useState, useEffect } from 'react';
import { ProcessedData } from '@/utils/fetchFlights';
import {
  calculateFlightStatistics,
  FlightStatistics as FlightStatisticsType,
} from '@/utils/fetchFlightsStatistics';
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaClock,
  FaChartPie,
  FaExclamationTriangle,
} from 'react-icons/fa';

interface FlightStatisticsProps {
  flightData: ProcessedData | null;
  isLoading: boolean;
}

export function FlightStatistics({ flightData, isLoading }: FlightStatisticsProps) {
  const [stats, setStats] = useState<FlightStatisticsType | null>(null);

  useEffect(() => {
    if (flightData) {
      setStats(calculateFlightStatistics(flightData));
    }
    const interval = setInterval(() => {
      if (flightData) {
        setStats(calculateFlightStatistics(flightData));
      }
    }, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, [flightData]);

  if (isLoading || !stats) {
    return <div className="p-4 text-gray-500">Loading flight statistics...</div>;
  }

  // For airline chart
  const airlineTotal = stats.airlineDistribution.reduce((sum, item) => sum + item.value, 0);
  const airlineSlices = stats.airlineDistribution.map((item, idx) => {
    const percent = (item.value / airlineTotal) * 100;
    return `${getColor(idx)} ${percent}%`;
  });

  function getColor(index: number): string {
    const colors = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#f472b6'];
    return colors[index % colors.length];
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
        <FaChartPie className="mr-2 text-blue-500" /> Flight Statistics (auto-refresh 60 min)
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow">
          <h3 className="text-blue-700 dark:text-blue-300 font-medium">Total Flights</h3>
          <div className="text-blue-600 dark:text-blue-400 text-2xl">{stats.totalFlights}</div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <FaPlaneDeparture className="inline mr-1 text-green-500" />
            {stats.departureCount} dep &nbsp;
            <FaPlaneArrival className="inline mr-1 text-purple-500" />
            {stats.arrivalCount} arr
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow">
          <h3 className="text-green-700 dark:text-green-300 font-medium">On-time Performance</h3>
          <div className="text-green-600 dark:text-green-400 text-2xl">{stats.onTimePercentage}%</div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <FaClock className="inline mr-1 text-yellow-500" />
            {stats.delayedCount} delayed &nbsp;
            <FaExclamationTriangle className="inline mr-1 text-red-500" />
            {stats.cancelledCount} cancelled
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg shadow">
          <h3 className="text-amber-700 dark:text-amber-300 font-medium mb-1">Top Airline</h3>
          <div className="text-xl font-semibold text-amber-600 dark:text-amber-400">
            {stats.airlineDistribution[0]?.name || 'N/A'}
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg shadow">
          <h3 className="text-indigo-700 dark:text-indigo-300 font-medium mb-1">Top Destination</h3>
          <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            {stats.destinationDistribution[0]?.name || 'N/A'}
          </div>
        </div>
      </div>

      {/* Airline "Pie" using CSS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Airline Distribution</h4>
          <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-white shadow"
            style={{
              background: `conic-gradient(${stats.airlineDistribution
                .map((item, i) => `${getColor(i)} 0 ${((item.value / airlineTotal) * 360).toFixed(0)}deg`)
                .join(', ')})`,
            }}
          ></div>
          <ul className="mt-4 text-sm text-gray-800 dark:text-gray-300">
            {stats.airlineDistribution.map((item, i) => (
              <li key={i} className="flex items-center mb-1">
                <span className="w-3 h-3 inline-block rounded-full mr-2" style={{ backgroundColor: getColor(i) }}></span>
                {item.name} ({item.value})
              </li>
            ))}
          </ul>
        </div>

        {/* Hourly Distribution Bars */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Hourly Distribution</h4>
          <div className="space-y-2 text-sm">
            {stats.hourlyDistribution.map((hour, i) => {
              const total = hour.arrivals + hour.departures;
              return (
                <div key={i}>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>{hour.hour}:00</span>
                    <span>{total} flights</span>
                  </div>
                  <div className="flex h-3 w-full bg-gray-300 rounded overflow-hidden">
                    <div
                      className="bg-blue-400"
                      style={{ width: `${(hour.departures / total) * 100 || 0}%` }}
                    ></div>
                    <div
                      className="bg-purple-400"
                      style={{ width: `${(hour.arrivals / total) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
