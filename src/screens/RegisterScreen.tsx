import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Title from '../components/Title';
import Rectangle from '../components/Rectangle';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import { NavigationProps } from '../navigation/navigation';
import { useTranslation } from 'react-i18next';
import ShisoAuthenImage from '../components/svg-JSX/shisoAuthen';
import axiosClient from '../api/axiosClient'; 
import Toast from 'react-native-toast-message';

import '../../i18n';

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>(); 

  // State để quản lý dữ liệu người dùng nhập vào
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityAnswer: '',
  });

const handleSignUp = async () => {
  try {
    const startTime = Date.now(); // Ghi nhận thời gian bắt đầu gửi request

    const response = await axiosClient.post('users/register', {
      username: formData.username,
      password: formData.password,
      securityAnswer: parseInt(formData.securityAnswer), // chuyển đổi sang số
    });

    const elapsedTime = Date.now() - startTime; // Tính thời gian đã xử lý BACKEND
    console.log(elapsedTime, 'ms'); 

    // Hiển thị thông báo bằng Toast
    Toast.show({
      type: 'success',
      text1: t('Success'),
      text2: response.data.message || t('Register'),
    });

    // Điều hướng sau khi Toast
    navigation.navigate('LogInAccount', { name: 'LogInAccount' });
  } 
  
    catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message); // Lỗi có kiểu `Error`
  } else {
    console.error('Unknown error:', error); // Nếu không phải lỗi theo kiểu `Error`
  }
}
};


  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>       
        <Title text={t('RegisterScreenWelcome')} />
      </View>
      <Rectangle
        imageSource={<ShisoAuthenImage />}
        placeholders={[t('Username'), t('Password'), t('SecurityNumber')]}
        onChange={(fieldName: string, value: string) => {
          const key = 
            fieldName === t('Username') ? 'username' :
            fieldName === t('Password') ? 'password' :
            'securityAnswer'; // Đảm bảo đúng key trong state
          setFormData((prev) => ({ ...prev, [key]: value }));
        }}
      />

      <CustomButton
        title={t('SignUp')}
        onPress={handleSignUp} // Thay đổi onPress để gọi handleSignUp
      />
      <LinkText
        text={t('BackToLogin')}
        style={styles.blackBoldText}
        onPress={() => navigation.navigate('LogInAccount', {name: 'LogInAccount'})} // Điều hướng về màn hình Login
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  firstImageWithTextContainer: {
    padding: 10,
    color: '#087738',
  },
  blackBoldText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
