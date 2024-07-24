/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  webpack: (config) => {
    config.cache = {
      type: "memory", // 캐시를 메모리로 설정
    };
    return config;
  },
};

export default nextConfig;
