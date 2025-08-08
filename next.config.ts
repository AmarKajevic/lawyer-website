import type { NextConfig } from "next";

const domains = [
  "wp.advokatizabeograd.rs",   // domen gde stoje WP slike
  "advokatizabeograd.rs",      // glavni domen sajta
];

// Ako želiš, dodaj i iz env promenljive ako postoji i nije već u listi
if (process.env.WP_IMAGES_URL && !domains.includes(process.env.WP_IMAGES_URL)) {
  domains.push(process.env.WP_IMAGES_URL);
}

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
