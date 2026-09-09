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

        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                async_hooks: false,
                fs: false,
                net: false,
                tls: false,
            };
        }

        return config;
    },
};

export default nextConfig;
