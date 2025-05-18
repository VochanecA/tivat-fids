'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { FlightTable } from '@/components/flight-table/flight-table';
import { version as nextVersion } from 'next/package.json';
import { FaClock } from 'react-icons/fa';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');
  const [latestUpdate, setLatestUpdate] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    setCurrentDate(`${day}.${month}.${year}, ${dayName}`);
  }, []);

  function formatDateTime(date: Date) {
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function requestFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message} (${err.name})`);
      });
    }
  }

  // This handler will be called from FlightTable after every data fetch
  function handleDataUpdate() {
    setLatestUpdate(new Date());
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1 mx-auto w-[90vw] max-w-full px-4 py-6">
        {/* Pass the callback to FlightTable */}
        <FlightTable onDataUpdate={handleDataUpdate} />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="text-center w-full sm:w-auto flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <FaClock className="text-blue-500" />
            {isClient && latestUpdate ? (
              <>
                Latest update:{' '}
                <time dateTime={latestUpdate.toISOString()}>
                  {formatDateTime(latestUpdate)}
                </time>
              </>
            ) : (
              <>Loading latest update...</>
            )}
          </div>

          <div className="text-center w-full sm:w-auto">
            © {new Date().getFullYear()} Code by Alen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
