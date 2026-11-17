/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  // The site now covers only egocentric data sourcing and robotics. Send old URLs somewhere useful.
  async redirects() {
    return [
      { source: "/tech/physical-ai", destination: "/egocentric-data", permanent: true },
      { source: "/tech/robotics", destination: "/robotics", permanent: true },
      { source: "/tech/:path*", destination: "/robotics", permanent: true },
      { source: "/marketplace/:path*", destination: "/", permanent: true },
      { source: "/marketplace", destination: "/", permanent: true },
      { source: "/events/:path*", destination: "/", permanent: true },
      { source: "/events", destination: "/", permanent: true },
      { source: "/chapters/:path*", destination: "/", permanent: true },
      { source: "/locations", destination: "/", permanent: true },
      { source: "/join", destination: "/contact", permanent: true },
    ];
  },
};
export default nextConfig;
