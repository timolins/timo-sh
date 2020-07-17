const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const withSvgr = (nextConfig = {}, nextComposePlugins = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = withPlugins([
  withSvgr,
  [
    optimizedImages,
    {
      handleImages: ["jpeg", "png", "webp", "gif"],
    },
  ],
]);
