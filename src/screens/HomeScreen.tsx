import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageWithText from '../components/ImageWithText';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import ImageHomeScreen1 from '../components/svg-JSX/firstHomescreen'; 
import ImageHomeScreen2 from  '../components/svg-JSX/firstHomescreen'; 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageWithText imageSource={<ImageHomeScreen1 />} text="Tạo nhân vật để chiến đấu cùng Shiso, bảo vệ những
vùng da bị tổn thương bởi “vẩy nến” nhé các bạn ! " />
      <ImageWithText imageSource={<ImageHomeScreen2 />} text="Chúng ta sẽ cùng thực hiện phương pháp tự nhiên 
và những “chiến lược” an toàn nhất" />
      <CustomButton title="Tạo tài khoản Shiso" onPress={() => console.log('Tạo tài khoản!')} />
      <LinkText text="Tôi đã có tài khoản" onPress={() => console.log('Đi đến màn hình đăng nhập')} />
      <LinkText text="Đăng nhập bằng Gmail" onPress={() => console.log('Đăng nhập với Gmail')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF9ED',
    padding: 20,
  },
});
