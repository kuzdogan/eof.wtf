const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser.js"), // Note the .js extension
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    crypto: require.resolve("crypto-browserify"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser.js", // Note the .js extension
    })
  );

  return config;
};
