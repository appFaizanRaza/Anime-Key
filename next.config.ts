import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-media.animekey.tv",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
