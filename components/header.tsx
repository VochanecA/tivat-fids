'use client';

import { Logo } from './logo';
import { ThemeToggle } from './ui/theme-toggle';
import { RefreshCw, Maximize, Menu, X, Info } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

import Link from 'next/link'; // if you're using Next.js

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Top row: logo left, date/time center, hamburger right - Desktop view */}
      <div className="hidden md:flex container mx-auto px-4 py-3 justify-between items-center">
        {/* Logo top-left */}
        <div className="flex items-center space-x-2">
          <Logo />
        </div>

        {/* Date & time centered, visible only on desktop */}
        <div className="flex flex-col items-center text-gray-700 dark:text-gray-300 font-mono">
          <span className="text-base sm:text-xl font-bold">{currentTime}</span>
          <span className="text-xs sm:text-sm">{currentDate}</span>
        </div>

        {/* Hamburger menu top-right */}
        <div className="relative">
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 flex flex-col p-2 space-y-2">
              <button
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Refresh data"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">Refresh</span>
              </button>

              <button
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle fullscreen"
                onClick={() => {
                  toggleFullscreen();
                  setMenuOpen(false);
                }}
              >
                <Maximize className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">Fullscreen</span>
              </button>
              <Link
  href="/about"
  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
>
  <Info className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  <span className="text-gray-700 dark:text-gray-300 text-sm">About</span>
</Link>

              <div className="flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
                <ThemeToggle />
                <span className="text-gray-700 dark:text-gray-300 text-sm select-none">Dark/Light Theme</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile view: logo left, hamburger right, date/time below */}
      <div className="md:hidden container mx-auto px-4 py-3 flex flex-col">
        <div className="flex justify-between items-center">
          {/* Logo top-left */}
          <div className="flex items-center space-x-2">
            <Logo />
          </div>

          {/* Hamburger menu top-right */}
          <div className="relative">
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 flex flex-col p-2 space-y-2">
                <button
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Refresh data"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Refresh</span>
                </button>

                <button
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle fullscreen"
                  onClick={() => {
                    toggleFullscreen();
                    setMenuOpen(false);
                  }}
                >
                  <Maximize className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Fullscreen</span>
                </button>
                <Link
  href="/about"
  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
>
  <Info className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  <span className="text-gray-700 dark:text-gray-300 text-sm">About</span>
</Link>

                <div className="flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
                  <ThemeToggle />
                  <span className="text-gray-700 dark:text-gray-300 text-sm select-none">Dark/Light Theme</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date & time below header, centered - Mobile view */}
        <div className="w-full flex justify-center py-2">
          <div className="flex flex-col items-center text-gray-700 dark:text-gray-300 font-mono">
            <span className="text-base sm:text-xl font-bold">{currentTime}</span>
            <span className="text-xs sm:text-sm">{currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
