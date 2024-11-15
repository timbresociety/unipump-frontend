/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pump.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
