import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type WhiteRectangleProps = {
  children: React.ReactNode;
};

const WhiteRectangle: React.FC<WhiteRectangleProps> = ({ children }) => (
  <View style={styles.rectangle}>
        <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    // borderWidth: 1,
  },

});

export default WhiteRectangle;
