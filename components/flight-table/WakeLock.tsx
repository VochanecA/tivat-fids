'use client';

import { useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

export default function WakeLock() {
  const { isSupported, released, request } = useWakeLock({
    reacquireOnPageVisible: true,
  });

  useEffect(() => {
    if (isSupported && released) {
      request().catch(console.error);
    }
  }, [isSupported, released, request]);

  return null; // no UI needed
}
