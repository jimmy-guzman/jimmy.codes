/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverComponentsExternalPackages: ["@napi-rs/simple-git"],
  },
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  reactStrictMode: true,
};

export default nextConfig;
