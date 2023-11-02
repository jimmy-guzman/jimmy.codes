/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
  experimental: {
    serverComponentsExternalPackages: ['@napi-rs/simple-git'],
  },
}

export default nextConfig
