// app/api/fetchFlights/route.ts
import { NextResponse } from 'next/server';
import { fetchFlights } from '../../../utils/fetchFlights';

export async function GET() {
  try {
    const data = await fetchFlights();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching flight data:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to fetch flight data', details: errorMessage },
      { status: 500 }
    );
  }
}
