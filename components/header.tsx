'use client';

import { Logo } from './logo';
import { ThemeToggle } from './ui/theme-toggle';
import { RefreshCw } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );

      setCurrentDate(
        now.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message} (${err.name})`);
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        {/* Logo and fullscreen toggle */}
        <div
          className="cursor-pointer flex items-center space-x-2"
          onClick={toggleFullscreen}
          title="Click to toggle fullscreen"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleFullscreen();
          }}
        >
          <Logo />
        
        </div>

        {/* Date and time, stacked on mobile */}
        <div className="flex flex-col items-center sm:items-end space-y-1 text-gray-700 dark:text-gray-300 font-mono">
          <span className="text-base sm:text-xl font-bold">{currentTime}</span>
          <span className="text-xs sm:text-sm">{currentDate}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Refresh data"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
