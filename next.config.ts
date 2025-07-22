import type { NextConfig } from "next";

const nextConfig = {
  output: "export", // Keep this for static export

  // These are crucial for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/chakki-dashboard" : "",
  // assetPrefix:
  //   process.env.NODE_ENV === "production" ? "/chakki-dashboard/" : "",

  // Optional: If you're using next/image, you might need this for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
