import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dw43hgf5p/**',
        search: '',
      }

      
    ]
  },
  experimental:{
    serverActions:{
      bodySizeLimit:'8mb'
    }
  }
};

export default nextConfig;
