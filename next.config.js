/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.51.16",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
