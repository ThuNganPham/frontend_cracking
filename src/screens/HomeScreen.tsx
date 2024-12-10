import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import ImageWithText from '../components/ImageWithText';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import ImageHomeScreen1 from '../components/svg-JSX/firstHomescreen'; 
import ImageHomeScreen2 from '../components/svg-JSX/secondHomescreen'; 

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Bọc ImageWithText đầu tiên trong View và thêm paddingTop */}
      <View style={styles.firstImageWithTextContainer}>
        <ImageWithText 
          imageSource={<ImageHomeScreen1 />}
          text={
            <Text style={styles.italicText}>
              Tạo nhân vật để chiến đấu cùng Shiso, bảo vệ những vùng da bị tổn thương bởi “vẩy nến” nhé các bạn!
            </Text>
          }
        />
      </View>
      <ImageWithText
        imageSource={<ImageHomeScreen2 />}
        text={
          <Text style={styles.italicText}>
            Chúng ta sẽ cùng thực hiện{' '}
            <Text style={styles.boldItalicText}>phương pháp tự nhiên </Text>
            và những “chiến lược” an toàn nhất
          </Text>
        }
      />
      <CustomButton
        title="Tạo tài khoản Shiso"
        onPress={() => console.log('Tạo tài khoản!')}
      />
      <LinkText
        text="Tôi đã có tài khoản"
        style={styles.blackBoldText} 
        onPress={() => console.log('Đi đến màn hình đăng nhập')}
      />
      <LinkText
        text="Đăng nhập bằng Gmail"
        style={styles.boldText}
        onPress={() => console.log('Đăng nhập với Gmail')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF9ED',
    padding: 30,
  },
  italicText: {
    fontStyle: 'italic', 
    fontSize: 16,
    color: '#333',
  },
  boldItalicText: {
    fontStyle: 'italic', 
    fontWeight: 'bold', 
    fontSize: 16,
    color: '#333',
  },
  blackBoldText: {
    fontWeight: 'bold',
    color: 'black', 
  },
  boldText: {
    fontWeight: 'bold', 
  },
  firstImageWithTextContainer: {
    paddingTop: height * 0.05, // Tự động thêm paddingTop theo chiều cao màn hình (5%)
  },
});
