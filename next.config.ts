import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        unoptimized: false,
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "*",
            },
            {
                protocol: "https",
                hostname: "*",
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Kích thước thiết bị hỗ trợ
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Kích thước hình ảnh
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
