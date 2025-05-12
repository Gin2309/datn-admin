/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "160.191.244.248",
        port: "9090",
        pathname: "/file-storage/view/**",
      },
    ],
  },
};

module.exports = nextConfig;
