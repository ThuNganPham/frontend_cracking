import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


interface RectangleProps{
      imageSource: React.ReactNode;  
      placeholders : string[];
}

// Đóng băng 😈😈😈
const sensitiveKeywords = Object.freeze(['password', 'secret', 'mật', 'bí']);


const Rectangle: React.FC<RectangleProps> =({imageSource, placeholders}) => {
  return (
     <View style={styles.rectangle}>
          <View style={styles.imageContainer}>
                {imageSource}
          </View>

      {placeholders.map((placeholder, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#248A50" 
          secureTextEntry={sensitiveKeywords.some((term) =>
            placeholder.toLowerCase().includes(term)
          )}
          autoComplete="off" 
          autoCorrect={false} 
          textContentType="none" 

          />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  rectangle: {
    width: '90%',
    backgroundColor: '#248A50',
    borderRadius: 10,
    padding: 25,
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
    height: 49,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    overflow:"hidden",

  },
  imageContainer: {
    marginBottom: 20, 
    marginLeft:48,
  },
});

export default Rectangle;
