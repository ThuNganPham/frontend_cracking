import React from 'react';
import { View, Text, StyleSheet , ViewStyle} from 'react-native';

type HorizontalWhiteBarProps = {
  children: React.ReactNode;
    style?:ViewStyle;

};

const HorizontalWhiteBar: React.FC<HorizontalWhiteBarProps> = ({ children }) => (
  <View style={styles.rectangle}>
        <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: 'white',
    padding: 30,
    width:1000,
    alignItems:'center',
    flexDirection:'column',
    // gap:10,
  },

});

export default HorizontalWhiteBar;
