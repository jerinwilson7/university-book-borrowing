import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Ignore non-code files from Zoho SDK
    config.module.rules.push({
      test: /\.(md|txt|map|LICENSE)$/,
      type: "asset/source",
    });

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@zohocrm/typescript-sdk-2.0"],
  },
};

export default nextConfig;
