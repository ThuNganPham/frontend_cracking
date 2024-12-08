import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from '../MyApp/src/screens/HomeScreen';  // Import màn hình HomeScreen

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />  {/* Gọi màn hình HomeScreen */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',  // Màu nền của ứng dụng
  },
});

export default App;
