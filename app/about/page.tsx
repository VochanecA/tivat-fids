'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { FaPlane, FaMapMarkerAlt, FaUserTie, FaArrowLeft } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200">
      <Header />

      <main className="flex-1 mx-auto w-[90vw] max-w-5xl px-4 py-12">
        <div className="mb-16 text-center transform transition-all duration-500 hover:scale-105">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            About This App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A modern flight information system for Tivat Airport (LYTV)
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Overview Card */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-4">
                <FaPlane className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">Overview</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Built with <span className="font-medium text-blue-600 dark:text-blue-400">Next.js 15</span> and{' '}
              <span className="font-medium text-green-600 dark:text-green-400">Tailwind CSS</span>, this app delivers 
              real-time flight data in a clean, responsive interface. Perfect for kiosks, tablets, or desktop use.
            </p>
          </section>

          {/* Airport Card */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mr-4">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">Tivat Airport</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The gateway to Montenegro stunning coast, Tivat Airport (LYTV) connects the Bay of Kotor with major 
              European cities. Despite its compact size, it handles significant seasonal tourist traffic.
            </p>
          </section>

          {/* Author Card */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-4">
                <FaUserTie className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold">The Developer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Hi, I am <span className="font-bold text-blue-700 dark:text-blue-300">Alen</span>, a developer passionate 
              about aviation and building efficient web apps. This project combines both passions to serve travelers 
              visiting beautiful Montenegro.
            </p>
          </section>
        </div>

        {/* Tech Stack Section */}
        <section className="mb-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Built With Modern Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { name: 'Next.js 15', color: 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700' },
              { name: 'Tailwind CSS', color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30' },
              { name: 'TypeScript', color: 'text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30' },
              { name: 'React Icons', color: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30' },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className={`p-4 rounded-xl ${tech.color} font-medium transition-transform duration-300 hover:scale-105 shadow-md`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <FaArrowLeft /> Back to Flight Dashboard
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 px-6 text-sm text-gray-500 dark:text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          © {new Date().getFullYear()} Made with 💙 by Alen. All rights reserved.
        </div>
      </footer>
    </div>
  );
}