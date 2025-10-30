// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);



const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/dist/metro/index.js"); // ✅ direct import fixes Windows + ESM issue

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = mergeConfig(getDefaultConfig(__dirname), {
  // You can extend the config here if needed
});

module.exports = withNativeWind(config, { input: "./global.css" });
