import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { 
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' }, 
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ] 
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
