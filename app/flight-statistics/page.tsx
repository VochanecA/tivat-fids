// app/flight-statistics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import FlightStatistics from '@/components/flight-table/flight-statistics';
import { ProcessedData } from '@/utils/fetchFlights';
import { calculateFlightStatistics } from '@/utils/fetchFlightsStatistics';

export default function FlightStatisticsPage() {
  const [statistics, setStatistics] = useState<any>(null);

  const fetchFlightData = async () => {
    try {
      const response = await fetch('/api/fetchFlights');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStatistics(calculateFlightStatistics(data));
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
  };

  useEffect(() => {
    fetchFlightData();
    const refreshInterval = setInterval(() => {
      fetchFlightData();
    }, 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="flex-1 mx-auto w-[90vw] max-w-full px-4 py-6">
        {statistics ? (
          <FlightStatistics statistics={statistics} isStandalone />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-400">Loading flight statistics...</p>
          </div>
        )}
      </main>
    </div>
  );
}