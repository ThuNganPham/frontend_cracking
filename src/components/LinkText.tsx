import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface LinkTextProps {
  text: string;
  onPress: () => void;
}

const LinkText: React.FC<LinkTextProps> = ({ text, onPress }) => {
  return (
    <Text style={styles.link} onPress={onPress}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#248A50',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default LinkText;
