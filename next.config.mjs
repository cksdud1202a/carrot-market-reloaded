/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        //next.js에게 이 URL의 이미지를 최적화하고 싶다 알림
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
