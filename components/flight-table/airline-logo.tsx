import Image from 'next/image';

interface AirlineLogoProps {
  name: string;
  icao: string;
}

export function AirlineLogo({ name, icao }: AirlineLogoProps) {
  const logoUrl = `https://www.flightaware.com/images/airline_logos/180px/${icao}.png`;
  
  return (
<div className="relative h-8 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        fill
 className="object-contain"  
        sizes="32px"
      />
    </div>
  );
}
