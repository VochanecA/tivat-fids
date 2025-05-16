// Get the appropriate color class based on flight status
export const getStatusColor = (status: string): string => {
  if (!status) return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('boarding')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  }
  
  if (statusLower.includes('processing') || statusLower.includes('cekiranje')) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  }
  
  if (statusLower.includes('delayed') || statusLower.includes('postponed')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
  }
   if (statusLower.includes('diverted') || statusLower.includes('postponed')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
  }
  
  if (statusLower.includes('cancelled')) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  }
  
  if (statusLower.includes('landed') || statusLower.includes('arrived')) {
    return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
  }
  
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
};