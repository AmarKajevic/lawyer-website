import type { NextConfig } from "next";

const domains = [];

if (process.env.WP_IMAGES_URL) {
  domains.push(process.env.WP_IMAGES_URL);
}

const nextConfig: NextConfig = {
  images: {
    domains,
  },
};

export default nextConfig;
