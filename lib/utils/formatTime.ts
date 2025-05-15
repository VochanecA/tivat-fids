// Format time from "HHMM" to "HH:MM"
export const formatTime = (time: string): string => {
  if (!time || time.trim() === '') return '--:--';
  
  // Ensure the time string is 4 characters long
  const paddedTime = time.padStart(4, '0');
  
  // Extract hours and minutes
  const hours = paddedTime.substring(0, 2);
  const minutes = paddedTime.substring(2, 4);
  
  return `${hours}:${minutes}`;
};