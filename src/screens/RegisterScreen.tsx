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
import axiosClient from '../api/axiosClient'; // Import axiosClient
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

  // Hàm xử lý khi người dùng nhấn nút Sign Up
  const handleSignUp = async () => {
    try {
      // Gửi dữ liệu đăng ký lên server
      const response = await axiosClient.post('users/register', {
        username: formData.username,
        password: formData.password,
        securityAnswer: parseInt(formData.securityAnswer), // Đảm bảo securityAnswer là số
      });

      Alert.alert(t('SignUpSuccess'), response.data.message || 'Đăng ký thành công!');
      navigation.navigate('LogInAccount', {name: 'LogInAccount'}); 
    } catch (error: any) {
          
      Alert.alert(t('SignUpFailed'), error.response?.data?.message || 'Đăng ký thất bại!');
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
