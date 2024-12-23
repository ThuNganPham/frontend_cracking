import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';


interface VanillaTextProps {
  children: React.ReactNode; 
  style?: TextStyle; 
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


