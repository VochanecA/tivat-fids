'use client';

import { useState, useEffect } from 'react';
import { ProcessedData } from '@/utils/fetchFlights';
import { FaPlaneArrival, FaPlaneDeparture, FaClock, FaCalendarAlt, FaChartPie } from 'react-icons/fa';

// Define the props interface
interface FlightStatisticsProps {
  flightData: ProcessedData | null;
  isLoading: boolean;
}

export function FlightStatistics({ flightData, isLoading }: FlightStatisticsProps) {
  const [stats, setStats] = useState({
    totalFlights: 0,
    departureCount: 0,
    arrivalCount: 0,
    onTimePercentage: 0,
    delayedCount: 0,
    cancelledCount: 0,
    airlineDistribution: [] as Array<{ name: string; value: number; percentage: number }>,
    destinationDistribution: [] as Array<{ name: string; count: number }>,
    originDistribution: [] as Array<{ name: string; count: number }>,
    statusDistribution: [] as Array<{ name: string; value: number }>,
    hourlyDistribution: [] as Array<{ hour: string; arrivals: number; departures: number }>,
  });

  useEffect(() => {
    if (flightData) {
      calculateStatistics(flightData);
    }
  }, [flightData]);

  const calculateStatistics = (data: ProcessedData) => {
    const { departures, arrivals } = data;
    const allFlights = [...departures, ...arrivals];

    // Basic counts
    const departureCount = departures.length;
    const arrivalCount = arrivals.length;
    const totalFlights = departureCount + arrivalCount;

    // Status counts
    const delayedCount = allFlights.filter(flight =>
      flight.status.includes('Delay') ||
      (flight.estimated_out !== '' && flight.estimated_out !== flight.scheduled_out)
    ).length;

    const cancelledCount = allFlights.filter(flight =>
      flight.status === 'Cancelled'
    ).length;

    const onTimeCount = allFlights.filter(flight =>
      flight.status === 'Departed' ||
      flight.status === 'Arrived' ||
      flight.status === 'Boarding' ||
      flight.status === 'Scheduled'
    ).length - delayedCount;

    const onTimePercentage = totalFlights > 0 ?
      Math.round((onTimeCount / totalFlights) * 100) : 0;

    // Airline distribution
    const airlineMap = new Map<string, number>();
    allFlights.forEach(flight => {
      const airline = flight.KompanijaNaziv || flight.Kompanija;
      airlineMap.set(airline, (airlineMap.get(airline) || 0) + 1);
    });

    const airlineDistribution = Array.from(airlineMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: totalFlights > 0 ? Math.round((value / totalFlights) * 100) : 0
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 airlines

    // Destination distribution
    const destMap = new Map<string, number>();
    departures.forEach(flight => {
      const destination = flight.grad || flight.destination.code;
      destMap.set(destination, (destMap.get(destination) || 0) + 1);
    });

    const destinationDistribution = Array.from(destMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 destinations

    // Origin distribution
    const originMap = new Map<string, number>();
    arrivals.forEach(flight => {
      const origin = flight.grad || flight.origin.code;
      originMap.set(origin, (originMap.get(origin) || 0) + 1);
    });

    const originDistribution = Array.from(originMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 origins

    // Status distribution
    const statusMap = new Map<string, number>();
    allFlights.forEach(flight => {
      statusMap.set(flight.status, (statusMap.get(flight.status) || 0) + 1);
    });

    const statusDistribution = Array.from(statusMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Hourly distribution
    const hourlyMap = new Map<string, { arrivals: number; departures: number }>();

    // Initialize hours from 00 to 23
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      hourlyMap.set(hour, { arrivals: 0, departures: 0 });
    }

    arrivals.forEach(flight => {
      if (flight.scheduled_out) {
        const hour = flight.scheduled_out.split(':')[0];
        const current = hourlyMap.get(hour) || { arrivals: 0, departures: 0 };
        hourlyMap.set(hour, { ...current, arrivals: current.arrivals + 1 });
      }
    });

    departures.forEach(flight => {
      if (flight.scheduled_out) {
        const hour = flight.scheduled_out.split(':')[0];
        const current = hourlyMap.get(hour) || { arrivals: 0, departures: 0 };
        hourlyMap.set(hour, { ...current, departures: current.departures + 1 });
      }
    });

    const hourlyDistribution = Array.from(hourlyMap.entries())
      .map(([hour, data]) => ({ hour, ...data }))
      .filter(item => item.arrivals > 0 || item.departures > 0)
      .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

    setStats({
      totalFlights,
      departureCount,
      arrivalCount,
      onTimePercentage,
      delayedCount,
      cancelledCount,
      airlineDistribution,
      destinationDistribution,
      originDistribution,
      statusDistribution,
      hourlyDistribution,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status.includes('Departed') || status.includes('Arrived')) return 'bg-green-500';
    if (status.includes('Delay')) return 'bg-yellow-500';
    if (status.includes('Cancelled')) return 'bg-red-500';
    if (status.includes('Boarding')) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
        <FaChartPie className="mr-2 text-blue-500" /> Flight Statistics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-blue-700 dark:text-blue-300 font-medium">Total Flights</h3>
            <span className="text-blue-600 dark:text-blue-400 text-2xl">{stats.totalFlights}</span>
          </div>
          <div className="flex mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center mr-4">
              <FaPlaneDeparture className="mr-1 text-green-500" />
              <span>{stats.departureCount} dep</span>
            </div>
            <div className="flex items-center">
              <FaPlaneArrival className="mr-1 text-purple-500" />
              <span>{stats.arrivalCount} arr</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-green-700 dark:text-green-300 font-medium">On-time Performance</h3>
            <span className="text-green-600 dark:text-green-400 text-2xl">{stats.onTimePercentage}%</span>
          </div>
          <div className="flex mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center mr-4">
              <FaClock className="mr-1 text-yellow-500" />
              <span>{stats.delayedCount} delayed</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-amber-700 dark:text-amber-300 font-medium">Top Airline</h3>
            <span className="text-amber-600 dark:text-amber-400 text-xl">
              {stats.airlineDistribution.length > 0 ? stats.airlineDistribution[0].name : 'N/A'}
            </span>
          </div>
          <div className="flex mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <span>{stats.airlineDistribution.length > 0 ? `${stats.airlineDistribution[0].value} flights` : ''}</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-purple-700 dark:text-purple-300 font-medium">Top Destination</h3>
            <span className="text-purple-600 dark:text-purple-400 text-xl">
              {stats.destinationDistribution.length > 0 ? stats.destinationDistribution[0].name : 'N/A'}
            </span>
          </div>
          <div className="flex mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <span>{stats.destinationDistribution.length > 0 ? `${stats.destinationDistribution[0].count} flights` : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Airlines Distribution - Bar Chart */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Airline Distribution</h3>
          <div className="space-y-3">
            {stats.airlineDistribution.length > 0 ? (
              stats.airlineDistribution.slice(0, 6).map((airline, index) => (
                <div key={index} className="w-full">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{airline.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{airline.value} flights</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${airline.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-500">
                No airline data available
              </div>
            )}
          </div>
        </div>

        {/* Hourly Distribution - Heatmap style */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Hourly Flight Distribution</h3>
          {stats.hourlyDistribution.length > 0 ? (
            <div className="grid grid-cols-6 gap-2">
              {stats.hourlyDistribution.map((hourData, index) => {
                const totalFlights = hourData.arrivals + hourData.departures;
                const maxFlights = Math.max(...stats.hourlyDistribution.map(h => h.arrivals + h.departures));
                const intensity = Math.max(0.2, totalFlights / maxFlights);

                return (
                  <div
                    key={index}
                    className="p-2 rounded-lg flex flex-col items-center justify-center text-center"
                    style={{
                      backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                      color: intensity > 0.6 ? 'white' : 'black',
                    }}
                  >
                    <div className="font-bold">{hourData.hour}:00</div>
                    <div className="text-xs mt-1">{totalFlights} flights</div>
                    <div className="flex justify-between gap-1 text-xs mt-1">
                      <span className="flex items-center">
                        <FaPlaneArrival className="mr-1" size={10} />
                        {hourData.arrivals}
                      </span>
                      <span className="flex items-center">
                        <FaPlaneDeparture className="mr-1" size={10} />
                        {hourData.departures}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-500">
              No hourly data available
            </div>
          )}
        </div>

        {/* Top Destinations */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Top Destinations</h3>
          {stats.destinationDistribution.length > 0 ? (
            <ul className="space-y-2">
              {stats.destinationDistribution.slice(0, 5).map((dest, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FaPlaneDeparture className="mr-2 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{dest.name}</span>
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 py-1 px-2 rounded text-sm">
                    {dest.count} {dest.count === 1 ? 'flight' : 'flights'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 py-4 text-center">No destination data available</div>
          )}
        </div>

        {/* Top Origins */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Top Origins</h3>
          {stats.originDistribution.length > 0 ? (
            <ul className="space-y-2">
              {stats.originDistribution.slice(0, 5).map((origin, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FaPlaneArrival className="mr-2 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">{origin.name}</span>
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 py-1 px-2 rounded text-sm">
                    {origin.count} {origin.count === 1 ? 'flight' : 'flights'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 py-4 text-center">No origin data available</div>
          )}
        </div>

        {/* Flight Status */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm md:col-span-2">
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Flight Status Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.statusDistribution.map((status, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(status.name)}`}></div>
                  <span className="text-gray-700 dark:text-gray-300 truncate">{status.name}</span>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 py-1 px-2 rounded text-sm">
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
