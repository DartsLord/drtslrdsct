/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

const nextConfig = {
  headers: () => [
    {
      source: '/livestratchain',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async headers() {
  //   return [
  //     {
  //       // Sets security headers for all routes
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value:
  //               "default-src 'self' http://localhost:3000; script-src 'self' 'http://localhost:3000'; style-src 'self' 'http://localhost:3000'; img-src 'self' 'http://localhost:3000'; font-src 'self' 'http://localhost:3000';"
  //         }
  //       ],
  //     },
  //   ];
  // },
};

dotenv.config({path: '../.env'});

export default nextConfig;

