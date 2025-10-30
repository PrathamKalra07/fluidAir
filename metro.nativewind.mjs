import { getDefaultConfig, mergeConfig } from '@react-native/metro-config';
import { withNativeWind } from 'nativewind/dist/metro/index.js'; // 👈 fixed import path

const config = mergeConfig(getDefaultConfig(new URL('.', import.meta.url).pathname), {});

const finalConfig = withNativeWind(config, { input: './global.css' });

// Print JSON so metro.config.js can read it
console.log(JSON.stringify(finalConfig));
