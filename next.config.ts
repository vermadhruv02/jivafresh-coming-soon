import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PostCSS cannot resolve plugins when the project path has spaces, so Tailwind runs as a Turbopack loader.
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
