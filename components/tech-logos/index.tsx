// @/components/tech-logos/index.tsx
import React from 'react';

export const NextJSLogo = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path 
      d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
      className="fill-gray-800 dark:fill-gray-200 group-hover:fill-black dark:group-hover:fill-white transition-colors duration-300"
    />
  </svg>
);

export const TailwindLogo = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path 
      d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
      className="fill-[#06B6D4] group-hover:fill-[#0ea5e9] transition-colors duration-300"
    />
  </svg>
);

export const ReactLogo = () => (
  <svg
    viewBox="0 0 512 461"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    fill="none"
    stroke="#61DAFB"
    strokeWidth="10"
  >
    {/* Central circle */}
    <circle cx="256" cy="230" r="45" fill="#61DAFB" stroke="none" />

    {/* Three ellipses rotated 0, 60, and 120 degrees */}
    <g stroke="#61DAFB" strokeWidth="10" fill="none">
      <ellipse cx="256" cy="230" rx="200" ry="50" />
      <ellipse cx="256" cy="230" rx="200" ry="50" transform="rotate(60 256 230)" />
      <ellipse cx="256" cy="230" rx="200" ry="50" transform="rotate(120 256 230)" />
    </g>
  </svg>
);



export const TypeScriptLogo = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path 
      d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"
      className="fill-[#3178C6] group-hover:fill-[#2563eb] transition-colors duration-300"
    />
  </svg>
);