import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        position: "top-right",
    },
    productionBrowserSourceMaps: false,
    experimental: {
        webpackMemoryOptimizations: true,
        optimizePackageImports: ["lucide-react"],
    },
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.devtool = false;
        }

        return config;
    },
};

export default nextConfig;
