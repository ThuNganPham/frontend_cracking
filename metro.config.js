// Trong React Native, "Metro" là tên gọi của công cụ bundler (trình đóng gói)
//  được sử dụng để đóng gói mã nguồn JavaScript và tài nguyên tĩnh (như hình ảnh, font chữ...) 
//  thành một gói duy nhất có thể chạy trên các thiết bị di động.
// const path = require('path');
// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// // Exclude `node_modules` from watch
// const exclusionList = require('metro-config/src/defaults/exclusionList'); // For blacklisting

// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: require.resolve('react-native-svg-transformer'),
// };

// config.resolver = {
//   ...config.resolver,
//   assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
//   sourceExts: [...config.resolver.sourceExts, 'svg'],
//   blacklistRE: exclusionList([/node_modules\/.*/]), // Blacklist node_modules
//   extraNodeModules: {
//     'src': path.resolve(__dirname, 'src'),
//   },
// };

// // module.exports = {
// //   ...config,
// //   watchFolders: [path.resolve(__dirname, 'src')], // Only watch the src folder
// //   transformer: {
// //     getTransformOptions: async () => ({
// //       transform: {
// //         experimentalImportSupport: false,
// //         inlineRequires: true,
// //       },
// //     }),
// //   },
// // };
// module.exports = config;
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
  // Thêm các thư mục cần theo dõi
  extraNodeModules: {
    'src': path.resolve(__dirname, 'src'),
    'assets': path.resolve(__dirname, 'assets')
  },
};

module.exports = config;

//