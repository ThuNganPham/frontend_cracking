import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Title from '../components/Title'



const { width, height } = Dimensions.get('window');

export default function SucessTestScreen() {
  return (
    <View style={styles.container}>
      <Title style={styles.titleText} text="Đăng nhập thành công. Dữ liệu đã được lưu vào AsyncStorage"  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingTop: height * 0.1, 
    paddingHorizontal: width * 0.05, 
  },
  titleText: {
    fontSize: width * 0.09,
    marginBottom: width * - 0.02,
  }
});