'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { FlightTable } from '@/components/flight-table/flight-table';
import { version as nextVersion } from 'next/package.json';

function Typewriter({
  text,
  speed = 100,
  style,
  className,
  infinite = false,
}: {
  text: string;
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
  infinite?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (infinite) {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, infinite]);

  const cursorStyle: React.CSSProperties = {
    borderRight: '2px solid',
    borderColor: 'inherit',
    animation: 'blink 1s step-start 0s infinite',
  };

  const styleSheet = `
    @keyframes blink {
      50% { border-color: transparent; }
    }
  `;

  return (
    <>
      <style>{styleSheet}</style>
      <span style={style} className={className}>
        {displayedText}
        <span style={cursorStyle}>&nbsp;</span>
      </span>
    </>
  );
}

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
          <div className="text-left w-full sm:w-auto">
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
            © {new Date().getFullYear()} Airports of Montenegro. All rights reserved.
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Next.js Logo"
              className="text-gray-700 dark:text-gray-300"
            >
              <path
                fill="currentColor"
                d="M12 2L1 21h22L12 2zM12 6.5l6.16 10.5H5.84L12 6.5z"
              />
            </svg>
            <span className="text-orange-500">Next.js v{nextVersion}</span>
            <span className="hidden sm:inline text-orange-500">| Code by Alen</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
