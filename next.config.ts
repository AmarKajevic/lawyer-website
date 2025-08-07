import type { NextConfig } from "next";

const domains = [];

if (process.env.WP_IMAGES_URL) {
  domains.push(process.env.WP_IMAGES_URL);
}

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  eslint: {
    ignoreDuringBuilds: true, // Ovo će ignorisati ESLint greške tokom builda
  },
};

export default nextConfig;
