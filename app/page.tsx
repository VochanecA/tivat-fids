'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { FlightTable } from '@/components/flight-table/flight-table';
import { FaClock } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

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

  function handleDataUpdate() {
    setLatestUpdate(new Date());
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1 mx-auto w-[90vw] max-w-full px-4 py-6">
        <FlightTable onDataUpdate={handleDataUpdate} />
        <div className="mt-4">
          <Link href="/flight-statistics">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to Flight Statistics
            </button>
          </Link>
        </div>
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
        <div className="mt-6 flex flex-col items-center justify-center space-y-2">
          <Image
            src="/FA_Logo_RGB-Hex.png"
            alt="FlightAware Logo"
            width={120}
            height={40}
            priority
            className="object-contain"
          />
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm max-w-md">
            Flight tracking powered by FlightAware — delivering reliable and real-time flight data.
          </p>
        </div>
      </footer>
    </div>
  );
}
