import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   productionBrowserSourceMaps: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
