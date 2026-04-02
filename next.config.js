/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
