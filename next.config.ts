import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // TMDB already serves pre-sized renditions, so a custom loader picks the
    // closest one instead of re-optimizing through /_next/image.
    loader: "custom",
    loaderFile: "./src/lib/tmdb/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Keep links to the old CRA routes working.
  async redirects() {
    return [
      { source: "/series", destination: "/tv", permanent: true },
      { source: "/Series", destination: "/tv", permanent: true },
      { source: "/UserLiked", destination: "/my-list", permanent: true },
      { source: "/help-center", destination: "/help", permanent: true },
      { source: "/player", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
