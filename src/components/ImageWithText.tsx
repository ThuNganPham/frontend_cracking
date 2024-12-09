import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Định nghĩa kiểu cho `imageSource` là `React.ReactNode` (cho phép nhận một component SVG)
interface ImageWithTextProps {
  imageSource: React.ReactNode;  // Cập nhật kiểu để hỗ trợ các component React như SVG/
  text: React.ReactNode; // Cho phép cả chuỗi và React Element
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      {imageSource} {/* Render SVG component */}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default ImageWithText;
