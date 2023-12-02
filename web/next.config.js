const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
      },
    ],
    deviceSizes: [640, 1080, 2048],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
