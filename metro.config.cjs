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
const { withNativeWind } = require("nativewind/metro");

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = mergeConfig(getDefaultConfig(__dirname), {
  // optional customizations
});

module.exports = withNativeWind(config, { input: "./global.css" });
