/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "notion.so",
      },
      {
        protocol: "https",
        hostname: "api.cloudnouns.com",
      },
    ],
  },
  // polyfills for wagmi
  // https://github.com/wagmi-dev/wagmi/issues/2300
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
