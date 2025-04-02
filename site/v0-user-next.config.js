/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["v0.blob.com", "placeholder.svg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v0.blob.com",
      },
      {
        protocol: "https",
        hostname: "placeholder.svg",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

