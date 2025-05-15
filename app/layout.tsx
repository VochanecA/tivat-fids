import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/hooks/useTheme';
import WakeLock from '@/components/flight-table/WakeLock'; // adjust path as needed

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tivat Airport - Flight Information',
  description: 'Real-time flight information for Tivat airport',
  manifest: '/manifest.json',
  themeColor: '#f97316',
  viewport: 'width=device-width, initial-scale=1', // <-- Add viewport here
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/icon-192x192.png', sizes: '192x192' },
    { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full w-full">
      <body className={`${inter.className} h-full w-full min-h-screen flex flex-col`}>
        <ThemeProvider>
          <WakeLock />
          <div className="flex-grow flex flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
