'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { FaChevronDown, FaChevronUp, FaPlane, FaClock, FaMapMarkerAlt, FaQuestion } from 'react-icons/fa';
import Link from 'next/link';

// FAQ item interface
interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: React.ReactNode;
}

// Categories with icons
const categories = [
  { name: 'Flight Information', icon: <FaPlane className="text-blue-500" /> },
  { name: 'Airport Services', icon: <FaClock className="text-green-500" /> },
  { name: 'Travel & Location', icon: <FaMapMarkerAlt className="text-red-500" /> },
  { name: 'General', icon: <FaQuestion className="text-amber-500" /> },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  // Define all FAQ items
  const faqItems: FAQItem[] = [
    // Flight Information
    {
      id: 1,
      category: 'Flight Information',
      question: 'How do I check flight arrivals at Tivat Airport?',
      answer: (
        <div>
          <p>You can check real-time flight arrivals at Tivat Airport in two ways:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use our <Link href="/arrivals" className="text-blue-600 hover:underline dark:text-blue-400">live arrivals tracker</Link> for the most up-to-date information</li>
            <li>Check the main <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">flight tracker</Link> page which shows both arrivals and departures</li>
          </ul>
          <p className="mt-2">Our flight information is updated in real-time through link with Airport Flight Database.</p>
        </div>
      )
    },
    {
      id: 2,
      category: 'Flight Information',
      question: 'How often is the flight information updated?',
      answer: (
        <p>
          Our flight data is updated in real-time through our integration with Airport FIDS database and FlightAware flight tracking API. 
          New information is typically reflected within 1 minutes of being reported by the airlines or air traffic control systems.
          The timestamp at the bottom of each page shows the most recent update time.
        </p>
      )
    },
    {
      id: 3,
      category: 'Flight Information',
      question: 'What airlines fly to and from Tivat Airport?',
      answer: (
        <div>
          <p>Tivat Airport (TIV) is served by multiple airlines including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Air Montenegro (national carrier)</li>
            <li>Air Serbia</li>
            <li>Turkish Airlines</li>
            <li>Lufthansa</li>
            <li>easyJet</li>
            <li>TUI Airways</li>
            <li>Transavia</li>
            <li>Numerous seasonal charter operators during summer months</li>
          </ul>
          <p className="mt-2">
            These airlines connect Tivat with major European cities including Belgrade, TeL Aviv, 
            London, Paris, Frankfurt, Manchester, Munich and many others.
          </p>
        </div>
      )
    },
    {
      id: 4,
      category: 'Flight Information',
      question: 'Why is my flight delayed?',
      answer: (
        <p>
          Flight delays can occur for various reasons including weather conditions, air traffic congestion, 
          mechanical issues, airline operational decisions, or delays from previous segments of the aircraft journey. 
          Our flight tracker shows the current flight status, but for specific reasons behind a delay, 
          we recommend contacting the airline directly. Most delays at Tivat Airport during summer are due to 
          the high volume of traffic and limited runway capacity.
        </p>
      )
    },
    {
      id: 5,
      category: 'Flight Information',
      question: 'How can I track a specific flight?',
      answer: (
        <p>
          To track a specific flight, navigate to our main flight tracker page and use the search function 
          to filter by flight number, airline, destination, or origin city. You can also bookmark a specific 
          flight for easier access in the future. Our system provides real-time updates on flight status, 
          arrival/departure times, and gate information when available.
        </p>
      )
    },
    
    // Airport Services
    {
      id: 6,
      category: 'Airport Services',
      question: 'Does Tivat Airport have WiFi?',
      answer: (
        <p>
          Yes, Tivat Airport offers complimentary WiFi throughout the terminal building. 
          Connect to the any WiFi network and follow the authentication instructions. 
          The service is reliable and allows passengers to stay connected before and after their flights, 
          check emails, browse websites, or use our flight tracker while at the airport.
        </p>
      )
    },
    {
      id: 7,
      category: 'Airport Services',
      question: 'What are the operating hours of Tivat Airport?',
      answer: (
        <p>
          Tivat Airport operates from sunrise till sunset, though most flights are scheduled between 7:00 AM and 19:00 PM (summer). 
          The terminal building and its facilities remain accessible to passengers throughout the day, 
          ensuring convenience for all flight schedules. However, some services like restaurants and shops may have 
          limited hours winter period.
        </p>
      )
    },
    {
      id: 8,
      category: 'Airport Services',
      question: 'Are there restaurants and shops at Tivat Airport?',
      answer: (
        <div>
          <p>Yes, Tivat Airport offers several dining and shopping options:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Cafés and restaurants serving drinks and sandwiches</li>
            <li>Duty-free shopping with local products, international brands, and souvenirs</li>
            <li>Convenience store</li>
     
          </ul>
          <p className="mt-2">
            Most establishments are located in the public area, with a few options available in the departure area.
            During peak summer season, all facilities are open for extended hours to accommodate the increased passenger traffic.
          </p>
        </div>
      )
    },
    {
      id: 9,
      category: 'Airport Services',
      question: 'Is there car rental available at Tivat Airport?',
      answer: (
        <p>
          Yes, several car rental companies operate at Tivat Airport, including international providers like Hertz, 
          Avis, Europcar, Sixt and local agencies. Their desks are located in the arrivals area of the terminal. 
          We recommend booking your rental car in advance, especially during the peak summer season when availability can be limited.
          Most rental agencies offer a range of vehicles suited to Montenegro coastal and mountain roads.
        </p>
      )
    },
    
    // Travel & Location
    {
      id: 10,
      category: 'Travel & Location',
      question: 'How far is Tivat Airport from Kotor?',
      answer: (
        <p>
          Tivat Airport is approximately 8 kilometers (5 miles) from Kotor, which is about a 15-minute drive 
          depending on traffic conditions. Taxis and shuttle services are readily available at the airport to 
          transport visitors to Kotor and other nearby destinations. During summer months, traffic can increase 
          travel time to about 25-30 minutes, so plan accordingly if you have a scheduled tour or appointment in Kotor.
        </p>
      )
    },
    {
      id: 11,
      category: 'Travel & Location',
      question: 'What transportation options are available from Tivat Airport?',
      answer: (
        <div>
          <p>Several transportation options are available from Tivat Airport:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Taxis:</strong> Available directly outside the terminal with regulated fares</li>
            <li><strong>Car Rentals:</strong> Multiple companies operate at the airport</li>
            <li><strong>Shuttle Services:</strong> Pre-bookable services to major hotels and resorts</li>
            <li><strong>Private Transfers:</strong> Can be arranged through hotels or travel agencies</li>
          </ul>
          <p className="mt-2">
            For the most convenient experience, we recommend arranging transportation in advance, 
            especially during the busy summer tourist season when demand is high.
          </p>
        </div>
      )
    },
    {
      id: 12,
      category: 'Travel & Location',
      question: 'What are the main tourist attractions near Tivat Airport?',
      answer: (
        <div>
          <p>Tivat Airport is perfectly positioned for exploring Montenegro coastal highlights:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Kotor:</strong> UNESCO World Heritage site with medieval architecture (15 min)</li>
            <li><strong>Porto Montenegro:</strong> Luxury marina and waterfront development (5 min)</li>
            <li><strong>Budva:</strong> Popular beach resort with historic old town (30 min)</li>
            <li><strong>Sveti Stefan:</strong> Iconic island resort connected to mainland (45 min)</li>
            <li><strong>Lovcen National Park:</strong> Mountain wilderness with panoramic views (1 hour)</li>
            <li><strong>Blue Cave:</strong> Natural sea cave with striking blue water (boat trip)</li>
            <li><strong>Perast:</strong> Charming coastal town with access to Our Lady of the Rocks (25 min)</li>
          </ul>
          <p className="mt-2">
            Most attractions are easily accessible by car or organized tours, which can be arranged locally.
          </p>
        </div>
      )
    },
    
    // General
    {
      id: 13,
      category: 'General',
      question: 'How accurate is your flight information?',
      answer: (
        <p>
          Our flight information is sourced directly from airport flight database. 
          The data is generally extremely accurate and updated in real-time. However, very last-minute changes by airlines 
          or air traffic control may take 1 minutes to be reflected in our system. For critical decisions, 
          we always recommend confirming information with your airline, especially during adverse weather conditions 
          or other situations that might cause widespread disruptions.
        </p>
      )
    },
    {
      id: 14,
      category: 'General',
      question: 'Is Tivat Airport open year-round?',
      answer: (
        <p>
          Yes, Tivat Airport operates year-round, though there is significant seasonal variation in flight schedules. 
          During summer (May-October), the airport handles numerous international flights from across Europe. 
          In winter, the schedule is reduced, with fewer direct international connections. However, year-round service 
          is maintained to key destinations like Belgrade and Istanbul. The airport facilities remain fully operational throughout the year, 
          serving both tourists and local residents.
        </p>
      )
    },
    {
      id: 15,
      category: 'General',
      question: 'How can I contact Tivat Airport directly?',
      answer: (
        <div>
          <p>You can contact Tivat Airport through the following channels:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Phone:</strong> +382 32 670 930</li>
            <li><strong>Email:</strong> info@tivat-airport.me</li>
            <li><strong>Address:</strong> Aerodrom Tivat, 85320 Tivat, Montenegro</li>
          </ul>
          <p className="mt-2">
            For specific airline inquiries, please contact the airline directly as the airport may not have 
            detailed information about individual flight arrangements or booking issues.
          </p>
        </div>
      )
    }
  ];

  // Filter FAQ items based on active category
  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  if (!mounted) {
    return null; // Prevent hydration errors
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="flex-1 mx-auto w-[90vw] max-w-4xl px-4 py-8">
        {/* SEO-optimized header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Tivat Airport FAQ - Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about Tivat Airport (TIV), flight information, 
            airport services, transportation, and travel to Montenegro coastal destinations.
          </p>
        </div>
        
        {/* Category selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveCategory('all')}
            >
              All Questions
            </button>
            
            {categories.map((cat) => (
              <button 
                key={cat.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
                  ${activeCategory === cat.name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(faq.id)}
                aria-expanded={openQuestions.includes(faq.id)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                {openQuestions.includes(faq.id) ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              
              {openQuestions.includes(faq.id) && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Return to home */}
        <div className="mt-10 text-center">
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors">
              Return to Flight Tracker
            </button>
          </Link>
        </div>
        
        {/* SEO paragraph */}
        <div className="mt-16 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">About Tivat Airport</h2>
          <p className="mb-3">
            Tivat Airport (TIV) is Montenegro coastal gateway, serving tourists and locals with flights to and from major 
            European destinations. Located near the Bay of Kotor, the airport provides convenient access to popular 
            tourist destinations including Kotor, Budva, Porto Montenegro, and other spectacular sites along Montenegro Adriatic coast.
          </p>
          <p>
            Our comprehensive FAQ answers common questions about flight information, airport facilities, transportation options, 
            and nearby attractions. Whether you are planning a trip to Montenegro or tracking a flight for someone, 
            this information helps ensure a smooth travel experience through Tivat Airport.
          </p>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto text-center">
          <p>© {new Date().getFullYear()} Code by Alen. All rights reserved.</p>
          <p className="mt-2">
            Have another question about Tivat Airport? 
            <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400 ml-1">
              Contact us
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}