import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Title from '../components/Title';
// import Rectangle from '../components/Rectangle';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import { NavigationProps } from '../navigation/navigation';
import { useTranslation } from 'react-i18next';
import ShisoAuthenImage from '../components/svg-JSX/shisoAuthen';
import axiosClient from '../api/axiosClient'; 

import '../../i18n';

const { height } = Dimensions.get('window');


import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  // Sử dụng useForm từ react-hook-form để quản lý form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const startTime = Date.now(); // Ghi nhận thời gian bắt đầu gửi request

      const response = await axiosClient.post('users/login', {
        username: data.username,
        password: data.password,
      });

      const elapsedTime = Date.now() - startTime; // Tính thời gian đã xử lý BACKEND
      console.log(elapsedTime, 'ms'); 

      // Hiển thị thông báo bằng Toast
      Toast.show({
        type: 'success',
        text1: t('Success'),
        text2: response.data.message || t('LogIn'),
      });

      // Điều hướng sau khi Toast
      navigation.navigate('CreateAccount', { name: 'CreateAccount' }); // Hoặc bất kỳ màn hình nào bạn muốn chuyển đến sau khi đăng nhập thành công
    } catch (error: unknown) {
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
        <Title text={t('LogInScreenWelcome')} />
      </View>

      {/* <Rectangle
        imageSource={<ShisoAuthenImage />}
        placeholders={[t('Username'), t('Password')]}
        control={control} // Truyền control từ react-hook-form vào Rectangle
      /> */}

      <CustomButton
        title={t('LogIn')}
        onPress={handleSubmit(onSubmit)} // Thay đổi onPress để gọi handleSubmit
      />

      <LinkText
        text={t('ForgotPassword')}
        style={styles.blackBoldText}
        onPress={() => console.log('Forgot Password pressed')} // Bạn có thể thêm logic cho forgot password ở đây
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
    padding : 10,
    color: '#087738',

  },
    blackBoldText: {
    fontWeight: 'bold',
    color: 'black',
  },

});
