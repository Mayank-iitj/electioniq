import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable edge runtime for streaming
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
