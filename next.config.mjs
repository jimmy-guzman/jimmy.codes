/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  reactStrictMode: true,
  serverExternalPackages: ["@napi-rs/simple-git"],
};

export default nextConfig;
