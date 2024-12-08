// Vì hai ảnh và text có cấu trúc tương tự 

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ImageWithTextProps {
  imageSource: any;
  text: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default ImageWithText;
