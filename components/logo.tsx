import { Plane } from 'lucide-react';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-left gap-2 ${className || ''}`}>
      <Plane className="h-7 w-7 text-blue-600 dark:text-blue-400" />
      <span className="font-bold text-xl text-blue-900 dark:text-white">
        Tivat Airport
      </span>
    </div>
  );
}
