const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = mergeConfig(getDefaultConfig(__dirname), {
  // optional customizations
});

config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts.push("svg");

module.exports = withNativeWind(config, { input: "./global.css" });

// const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
// const { withNativeWind } = require("nativewind/metro");
// const path = require("path");

// const defaultConfig = getDefaultConfig(__dirname);

// const customConfig = {
//   transformer: {
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   },
//   resolver: {
//     assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
//     sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
//   },
// };

// const merged = mergeConfig(defaultConfig, customConfig);

// module.exports = withNativeWind(merged, { input: "./global.css" });
