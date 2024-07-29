/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

dotenv.config({path: '../.env'});

export default nextConfig;

