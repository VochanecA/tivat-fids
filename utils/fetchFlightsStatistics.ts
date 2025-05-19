// utils/fetchFlightsStatistics.ts

import { ProcessedData } from './fetchFlights';

export interface FlightStatistics {
  totalFlights: number;
  departureCount: number;
  arrivalCount: number;
  onTimePercentage: number;
  delayedCount: number;
  cancelledCount: number;
  airlineDistribution: Array<{ name: string; value: number; percentage: number }>;
  destinationDistribution: Array<{ name: string; count: number }>;
  originDistribution: Array<{ name: string; count: number }>;
  statusDistribution: Array<{ name: string; value: number }>;
  hourlyDistribution: Array<{ hour: string; arrivals: number; departures: number }>;
}

export function calculateFlightStatistics(data: ProcessedData): FlightStatistics {
  const { departures, arrivals } = data;
  const allFlights = [...departures, ...arrivals];

  // Basic counts
  const departureCount = departures.length;
  const arrivalCount = arrivals.length;
  const totalFlights = departureCount + arrivalCount;

  // Status counts
  const delayedCount = allFlights.filter(flight =>
    flight.status.includes('Delay') ||
    (flight.estimated_out !== '' && flight.estimated_out !== flight.scheduled_out)
  ).length;

  const cancelledCount = allFlights.filter(flight =>
    flight.status === 'Cancelled'
  ).length;

  const onTimeCount = allFlights.filter(flight =>
    flight.status === 'Departed' ||
    flight.status === 'Arrived' ||
    flight.status === 'Boarding' ||
    flight.status === 'Scheduled'
  ).length - delayedCount;

  const onTimePercentage = totalFlights > 0
    ? Math.round((onTimeCount / totalFlights) * 100)
    : 0;

  // Airline distribution
  const airlineMap = new Map<string, number>();
  allFlights.forEach(flight => {
    const airline = flight.KompanijaNaziv || flight.Kompanija;
    airlineMap.set(airline, (airlineMap.get(airline) || 0) + 1);
  });

  const airlineDistribution = Array.from(airlineMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalFlights > 0 ? Math.round((value / totalFlights) * 100) : 0
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Destination distribution
  const destMap = new Map<string, number>();
  departures.forEach(flight => {
    const destination = flight.grad || (flight.destination && flight.destination.code);
    destMap.set(destination, (destMap.get(destination) || 0) + 1);
  });

  const destinationDistribution = Array.from(destMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Origin distribution
  const originMap = new Map<string, number>();
  arrivals.forEach(flight => {
    const origin = flight.grad || (flight.origin && flight.origin.code);
    originMap.set(origin, (originMap.get(origin) || 0) + 1);
  });

  const originDistribution = Array.from(originMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Status distribution
  const statusMap = new Map<string, number>();
  allFlights.forEach(flight => {
    statusMap.set(flight.status, (statusMap.get(flight.status) || 0) + 1);
  });

  const statusDistribution = Array.from(statusMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Hourly distribution
  const hourlyMap = new Map<string, { arrivals: number; departures: number }>();
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    hourlyMap.set(hour, { arrivals: 0, departures: 0 });
  }

  arrivals.forEach(flight => {
    if (flight.scheduled_out) {
      const hour = flight.scheduled_out.split(':')[0];
      const current = hourlyMap.get(hour) || { arrivals: 0, departures: 0 };
      hourlyMap.set(hour, { ...current, arrivals: current.arrivals + 1 });
    }
  });

  departures.forEach(flight => {
    if (flight.scheduled_out) {
      const hour = flight.scheduled_out.split(':')[0];
      const current = hourlyMap.get(hour) || { arrivals: 0, departures: 0 };
      hourlyMap.set(hour, { ...current, departures: current.departures + 1 });
    }
  });

  const hourlyDistribution = Array.from(hourlyMap.entries())
    .map(([hour, data]) => ({ hour, ...data }))
    .filter(item => item.arrivals > 0 || item.departures > 0)
    .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

  return {
    totalFlights,
    departureCount,
    arrivalCount,
    onTimePercentage,
    delayedCount,
    cancelledCount,
    airlineDistribution,
    destinationDistribution,
    originDistribution,
    statusDistribution,
    hourlyDistribution,
  };
}
