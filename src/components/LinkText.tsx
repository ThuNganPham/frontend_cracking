import React from 'react';
import { Text, StyleSheet, TextStyle, GestureResponderEvent } from 'react-native';

interface LinkTextProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: TextStyle; 
}

const LinkText: React.FC<LinkTextProps> = ({ text, onPress, style }) => {
  return (
    <Text style={[styles.link, style]} onPress={onPress}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#248A50',
    textDecorationLine: 'none',
    textAlign: 'center',
    marginTop: 8,
    fontSize:18,
  },
});

export default LinkText;
//