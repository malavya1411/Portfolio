import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the GitHub readme-stats service used in GitHubActivity section
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
      {
        protocol: "https",
        hostname: "github-readme-streak-stats.herokuapp.com",
      },
      {
        protocol: "https",
        hostname: "github-profile-trophy.vercel.app",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

