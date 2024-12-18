import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

// Định nghĩa kiểu cho `imageSource` là `React.ReactNode` (cho phép nhận một component SVG)

interface VanillaTextProps {
  children: React.ReactNode; // Cho phép nhận các React elements lồng bên trong
  style?: TextStyle; // Cho phép style tùy chỉnh (tùy chọn)
}

const VanillaText: React.FC<VanillaTextProps> = ({ children, style }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.baseText, style]}>{children}</Text>
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
    baseText: {
    fontSize: 16,
    color: '#000',
  },
});

export default VanillaText;


