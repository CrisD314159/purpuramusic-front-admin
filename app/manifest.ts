import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Purpura Musid Admin',
    short_name: 'Purpura Music ADM',
    description: 'Purpura Music Admin Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons:[
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ]
    
  }
}