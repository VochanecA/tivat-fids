// Map of airline codes to logo URLs
// Since the original logo paths are file system paths that we can't access,
// we'll use placeholder logos from a free image hosting service

export const getAirlineLogo = (airline: string): string => {
  const logoMap: Record<string, string> = {
    // Common airlines that operate in Montenegro
    'Air Montenegro': 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Air Serbia': 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Turkish Airlines': 'https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Easy Jet': 'https://images.pexels.com/photos/163792/model-planes-airplanes-miniature-163792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'ELAL': 'https://images.pexels.com/photos/1098745/pexels-photo-1098745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'JET2': 'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'ISRAIR': 'https://images.pexels.com/photos/1463525/pexels-photo-1463525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'ARKIA': 'https://images.pexels.com/photos/1575833/pexels-photo-1575833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Azerbaijan Airlines': 'https://images.pexels.com/photos/1098747/pexels-photo-1098747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  // Return the logo URL if found, otherwise a default logo
  return logoMap[airline] || 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
};