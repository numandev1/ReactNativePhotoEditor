import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {PESDK, Configuration, TintMode} from 'react-native-photoeditorsdk';

/**
 * Uncomment the following single line of code to unlock PhotoEditor SDK automatically
 * for both platforms. Every platform requires a separate license file which must be
 * named `pesdk_license.ios.json` for the iOS license and `pesdk_license.android.json`
 * for the Android license file.
 */
// PESDK.unlockWithLicense(require('./pesdk_license.ios.json'));
PESDK.unlockWithLicense(
  Platform.OS === 'ios'
    ? require('./vesdk_ios_license.json')
    : require('./PESDK_LICENSE_ANDROID.json'),
);

const App = () => {
  const openEditor = () => {
    // Set up sample image
    let image = require('./assets/LA.jpg');
    // Set up configuration
    let configuration: Configuration = {
      // Configure sticker tool
      sticker: {
        // Enable personal stickers
        personalStickers: true,
        // Configure stickers
        categories: [
          // Create sticker category with stickers
          {
            identifier: 'example_sticker_category_logos',
            name: 'Logos',
            thumbnailURI: require('./assets/React-Logo.png'),
            items: [
              {
                identifier: 'example_sticker_logos_react',
                name: 'React',
                stickerURI: require('./assets/React-Logo.png'),
              },
              {
                identifier: 'example_sticker_logos_imgly',
                name: 'img.ly',
                stickerURI: require('./assets/imgly-Logo.png'),
                tintMode: TintMode.SOLID,
              },
            ],
          },
          // Use existing sticker category
          {identifier: 'imgly_sticker_category_emoticons'},
          // Modify existing sticker category
          {
            identifier: 'imgly_sticker_category_shapes',
            items: [
              {identifier: 'imgly_sticker_shapes_badge_01'},
              {identifier: 'imgly_sticker_shapes_arrow_02'},
              {identifier: 'imgly_sticker_shapes_spray_03'},
            ],
          },
        ],
      },
    };
    PESDK.openEditor(image, configuration).then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      },
    );
  };
  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>PhotoEditor SDK</Text>
        <TouchableHighlight onPress={openEditor}>
          <Text style={styles.sectionDescription}>
            Click here to{' '}
            <Text style={styles.highlight}>edit a sample image</Text>.
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
