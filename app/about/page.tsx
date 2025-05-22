'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { FaPlane, FaMapMarkerAlt, FaUserTie, FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { NextJSLogo, TailwindLogo, ReactLogo, TypeScriptLogo } from '@/components/tech-logos';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

      <Header />

      <main className="flex-1 mx-auto w-[90vw] max-w-5xl px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className={`mb-16 text-center relative transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute -top-8 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            UNOFFICIAL BUILD
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            About This App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A modern flight information system for Tivat Airport (LYTV)
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Overview Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 relative overflow-hidden hover:-translate-y-1">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-400/10 rounded-full filter blur-xl"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100/80 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-4 backdrop-blur-sm">
                <FaPlane className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">Overview</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Built with <span className="font-medium text-blue-600 dark:text-blue-400">Next.js 15</span> and{' '}
              <span className="font-medium text-green-600 dark:text-green-400">Tailwind CSS</span>, this app delivers 
              real-time flight data in a clean, responsive interface. Perfect for kiosks, tablets, or desktop use.
            </p>
          </div>

          {/* Airport Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 relative overflow-hidden hover:-translate-y-1">
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-green-400/10 rounded-full filter blur-xl"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100/80 dark:bg-green-900/50 text-green-600 dark:text-green-400 mr-4 backdrop-blur-sm">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">Tivat Airport</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The gateway to Montenegro stunning coast, Tivat Airport (LYTV) connects the Bay of Kotor with major 
              European cities. Despite its compact size, it handles significant seasonal tourist traffic.
            </p>
          </div>

          {/* Author Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 relative overflow-hidden hover:-translate-y-1">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-400/10 rounded-full filter blur-xl"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100/80 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-4 backdrop-blur-sm">
                <FaUserTie className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">The Developer</h2>
            </div>
<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
  Hi, I am{' '}
  <a
    href="mailto:center.applications@gmail.com"
    className="font-bold text-blue-700 dark:text-blue-300 underline hover:text-blue-900 dark:hover:text-blue-500"
  >
    Alen
  </a>
  , a developer passionate about aviation and building efficient web apps. This project combines both passions to serve travelers visiting beautiful Montenegro.
</p>

          </div>
        </div>

        {/* Tech Stack Section */}
        <div className={`mb-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/50 transition-all duration-500 hover:shadow-lg relative overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-400/10 rounded-full filter blur-3xl"></div>
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Built With Modern Technologies
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 15', logo: <NextJSLogo />, score: '100', color: 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600' },
              { name: 'Tailwind CSS', logo: <TailwindLogo />, score: '100', color: 'from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-600' },
              { name: 'TypeScript', logo: <TypeScriptLogo />, score: '100', color: 'from-sky-200 to-sky-300 dark:from-sky-700 dark:to-sky-600' },
              { name: 'React Icons', logo: <ReactLogo />, score: '100', color: 'from-pink-200 to-pink-300 dark:from-pink-700 dark:to-pink-600' },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className={`group relative p-6 rounded-xl bg-gradient-to-br ${tech.color} shadow-md overflow-hidden transition-transform duration-300 hover:scale-105`}
              >
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    {tech.logo}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">{tech.name}</h3>
                  <div className="text-xs font-mono bg-black/10 dark:bg-white/10 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                    Performance: {tech.score}/100
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/"
            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-0"></span>
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Flight Dashboard</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200/50 dark:border-gray-800/50 py-6 px-6 text-sm text-gray-500 dark:text-gray-400 mt-auto backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          © {new Date().getFullYear()} Made with <span className="text-red-500">❤️</span> by Alen. All rights reserved.
        </div>
      </footer>
    </div>
  );
}