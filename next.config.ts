import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
        search: '',
      },
      
    ]
  },
  experimental:{
    serverActions:{
      bodySizeLimit:'8mb'
    }
  }
};

export default nextConfig;
