import { getStatusColor } from '@/lib/utils/getStatusColor';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return null;
  
  const colorClass = getStatusColor(status);
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
}