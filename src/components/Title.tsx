import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

type TitleProps = {
  text: string;

};

const Title: React.FC<TitleProps> = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#087738',
    
  },
});

export default Title;
