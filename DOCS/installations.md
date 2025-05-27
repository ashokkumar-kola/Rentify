# 

## Installed Packages
npm install react-native-svg
npm install --save-dev react-native-svg-transformer



## Install Required Packages

npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
npm install @react-navigation/native-stack


npm install react-native-onboarding-swiper









✅ Option 1: Use react-native-svg + react-native-svg-transformer (Best for inline SVG)

This lets you import and render SVGs as components.
1. Install required packages:

npm install react-native-svg
npm install --save-dev react-native-svg-transformer

2. Create or update metro.config.js:

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig();
  const assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
  const sourceExts = [...config.resolver.sourceExts, 'svg'];

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts,
      sourceExts,
    },
  };
})();

3. Import and use the SVG:

import MySVG from '../assets/images/10783169_19198818.svg';

<MySVG width={100} height={100} />



