import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const Rectangle = () => {
  return (
    <View style={styles.rectangle}>
      {/* Image */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/100' }} 
        style={styles.image} 
      />

      {/* Input Fields */}
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f7f7f7',
  },
});

export default Rectangle;
