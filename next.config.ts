import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent bundling of Firebase Admin SDK on the client side
  serverExternalPackages: ['firebase-admin'],
  // Ensure API routes are not statically optimized
  async rewrites() {
    return [];
  },
};

export default nextConfig;
