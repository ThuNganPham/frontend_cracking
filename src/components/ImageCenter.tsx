import React from 'react';
import { View, StyleSheet,ViewStyle , Dimensions} from 'react-native';

interface RectangleProps {
  imageSource: React.ReactNode; 
  style?:ViewStyle;
}

const { height } = Dimensions.get('window');

const RectangleCenter: React.FC<RectangleProps> = ({ imageSource }) => {
  return (
    <View style={styles.rectangleContainer}>
      {imageSource}
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleContainer: {
    marginTop:height * 0.02,
    alignSelf:'center'
  },
});

export default RectangleCenter;
