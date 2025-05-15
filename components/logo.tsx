import { Plane } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Plane className="h-7 w-7 text-blue-600 dark:text-blue-400" />
      <span className="font-bold text-xl text-blue-900 dark:text-white">Airports of Montenegro-Tivat Airport</span>
    </div>
  );
}