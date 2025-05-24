'use client';

import { Logo } from './logo';
import { ThemeToggle } from './ui/theme-toggle';
import { RefreshCw, Maximize, Menu, X, Info, Download, BatteryCharging, Battery, HelpCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

import { FaPlaneArrival, FaPlaneDeparture, FaChartBar } from 'react-icons/fa';

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Battery Saver State
  const [batterySaverOn, setBatterySaverOn] = useState(false);

  // Force re-render function for WebView theme issues
  const forceWebViewRefresh = useCallback(() => {
    // Force a reflow to ensure CSS variables are updated in WebView
    if (typeof window !== 'undefined') {
      // Method 1: Force reflow
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
      
      // Method 2: Add/remove a class to trigger re-render
      document.documentElement.classList.add('theme-refresh');
      setTimeout(() => {
        document.documentElement.classList.remove('theme-refresh');
      }, 10);
      
      // Method 3: For WebView, sometimes we need to force repaint
      const isWebView = /wv/.test(navigator.userAgent);
      if (isWebView) {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    }
  }, []);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Battery Saver: read from localStorage and set <html> attribute
    const saved = localStorage.getItem('batterySaverOn');
    if (saved === 'true') {
      setBatterySaverOn(true);
      document.documentElement.setAttribute('data-battery-saver', 'on');
    }

    // Listen for theme changes to force refresh in WebView
    const handleThemeChange = () => {
      setTimeout(() => {
        forceWebViewRefresh();
      }, 50);
    };

    // Listen for class changes on documentElement (theme changes)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [forceWebViewRefresh]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  }, []);

  // Battery Saver Toggle Handler
  const toggleBatterySaver = () => {
    const newValue = !batterySaverOn;
    setBatterySaverOn(newValue);
    if (newValue) {
      document.documentElement.setAttribute('data-battery-saver', 'on');
    } else {
      document.documentElement.removeAttribute('data-battery-saver');
    }
    localStorage.setItem('batterySaverOn', newValue.toString());
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-gray-900'} border-b border-gray-200/70 dark:border-gray-800/70`}>
      <div className="container mx-auto px-4">
        {/* Main header content */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with subtle animation */}
          <div className="flex items-center space-x-2 group">
            <Logo />
          </div>

          {/* Date & time display - Desktop */}
          <div className="hidden md:flex flex-col items-center">
            <div className="relative">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100 font-mono tracking-tight">
                {currentTime}
              </span>
              <span className="absolute -bottom-7 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400">
                {currentDate}
              </span>
            </div>
          </div>

          {/* Action buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:rotate-180"
              aria-label="Refresh data"
            >
              <RefreshCw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="Toggle fullscreen"
            >
              <Maximize className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <Link
              href="/arrivals"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="Arrivals"
            >
              <FaPlaneArrival className="h-5 w-5 text-green-600 dark:text-green-300" />
            </Link>
            <Link
              href="/departures"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="Departures"
            >
              <FaPlaneDeparture className="h-5 w-5 text-orange-500 dark:text-orange-300" />
            </Link>
            <Link
              href="/flight-statistics"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="Flight Statistics"
            >
              <FaChartBar className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="/about"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="About page"
            >
              <Info className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="/faq"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              aria-label="FAQ page"
            >
              <HelpCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            {/* Download APK for Android */}
            <Link
              href="/Tivat-FIDS.apk"
              download
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex items-center space-x-1"
              aria-label="Download APK for Android"
              title="Download APK for Android"
            >
              <Download className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" focusable="false" />
              <span className="hidden sm:inline"></span>
              <span className="sr-only">Download APK for Android</span>
            </Link>
            

            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Date & time display - Mobile */}
        <div className="md:hidden py-2 flex justify-center">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100 font-mono">
              {currentTime}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentDate}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 relative">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <button
              onClick={() => {
                window.location.reload();
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-700 dark:text-gray-300">Refresh Data</span>
              <RefreshCw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            <button
              onClick={() => {
                toggleFullscreen();
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-700 dark:text-gray-300">Fullscreen Mode</span>
              <Maximize className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <Link
              href="/arrivals"
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-gray-700 dark:text-gray-300">Arrivals</span>
              <FaPlaneArrival className="h-5 w-5 text-green-600 dark:text-green-300" />
            </Link>
            <Link
              href="/departures"
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-gray-700 dark:text-gray-300">Departures</span>
              <FaPlaneDeparture className="h-5 w-5 text-orange-500 dark:text-orange-300" />
            </Link>

            <Link
              href="/flight-statistics"
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-gray-700 dark:text-gray-300">Flight Statistics</span>
              <FaChartBar className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="/about"
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-gray-700 dark:text-gray-300">About</span>
              <Info className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="/faq"
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-gray-700 dark:text-gray-300">FAQ</span>
              <HelpCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            {/* Download APK for Android */}
            <Link
              href="/Tivat-FIDS.apk"
              download
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Download APK for Android"
            >
              <span className="text-gray-700 dark:text-gray-300">Download APK for Android</span>
              <Download className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>

            {/* Battery Saver Toggle */}
            <button
              onClick={() => {
                toggleBatterySaver();
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-pressed={batterySaverOn}
              aria-label="Toggle Battery Saver mode"
            >
              <span className="text-gray-700 dark:text-gray-300">
                Battery Saver {batterySaverOn ? 'On' : 'Off'}
              </span>
              {batterySaverOn ? (
                <BatteryCharging className="h-5 w-5 text-green-500" />
              ) : (
                <Battery className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            <div className="w-full flex items-center justify-between p-3 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}