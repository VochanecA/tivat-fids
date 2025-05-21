import { MetadataRoute } from 'next';

// This file automatically generates /robots.txt 
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Exclude certain admin or private sections if needed
    disallow: ['/private/', '/api/'],
    },
    // Add XML sitemap reference - update with your actual domain
    sitemap: 'https://tivat-fids.vercel.app/sitemap.xml',
  };
}

