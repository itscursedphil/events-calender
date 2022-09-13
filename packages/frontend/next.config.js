/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) return config;

    config.resolve.alias.config = path.resolve(__dirname, './configShim.js');

    return config;
  },
};

module.exports = nextConfig;
