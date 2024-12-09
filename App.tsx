import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from '../MyApp/src/screens/HomeScreen';  

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle="dark-content" />
      <HomeScreen />  {/* Gọi màn hình HomeScreen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',  // Màu nền của ứng dụng
     alignSelf: 'center', 

 
  },
});

export default App;
