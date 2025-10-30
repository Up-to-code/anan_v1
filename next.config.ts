import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  cacheComponents: true,
  transpilePackages: ['@lucide/react'],
};

export default nextConfig;
