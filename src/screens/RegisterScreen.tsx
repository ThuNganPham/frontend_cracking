import React from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title';
import Rectangle from '../components/Image';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import { useTranslation } from 'react-i18next';
import ShisoAuthenImage from '../components/svg-JSX/shisoAuthen';
import axiosClient from '../api/axiosClient';
import { useForm } from 'react-hook-form';
import { NavigationProps } from '../navigation/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../i18n';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { getValidationSchema } from '../validation/RegistrationSchema';
import { RegisterInput } from '../components/Form';
import { showToast } from '../utils/toastHelper'; 
import { useLoading } from '../contexts/LoadingContext'; 
import { useAuth } from '../contexts/AuthContext'; 


const { height } = Dimensions.get('window');

interface RegisterData {
  username: string;
  password: string;
  email: string; 
}


export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const validationSchema = getValidationSchema(t);
  const { isLoading, setIsLoading } = useLoading();
  const { setUsername } = useAuth();


  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    resolver: yupResolver(validationSchema, { abortEarly: false }),
  });

  const onSubmit = async (data: RegisterData) => {
  setIsLoading(true); 
  try {
    console.log('Register data:', data);
    await axiosClient.post('users/register', {
      username: data.username,
      password: data.password,
      securityAnswer: data.email,
    });

    await axiosClient.post('users/get-otp',{
      username: data.username,
    });
    setUsername(data.username);
    showToast('success', t('Success'), `chào mừng ${data.username} đến với ShiSo`);

    navigation.navigate('RegisterOTPScreen', { name: 'RegisterOTPScreen' });
  } catch (error: any) {
    console.error('Error during registration:', error.response?.data || error.message);
    showToast('error', t('Error'), error.response?.data?.message || t('RegisterFailed'));
  } finally {
      setIsLoading(false); // Tắt loading khi đã có phản hồi từ server
    }
};

  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>
        <Title text={t('ScreenWelcome')} />
      </View>
      <KeyboardAvoidingView style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}>
        <Rectangle imageSource={<ShisoAuthenImage />} />
        <RegisterInput control={control} name="username" placeholder={t('Username')} />
        <RegisterInput control={control} name="password" placeholder={t('Password')} secureTextEntry />
        <RegisterInput
          control={control}
          name="email"
          placeholder="ShiSoHello@gmail.com"
        />
      </KeyboardAvoidingView>

      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <CustomButton title={t('SignUp')} onPress={handleSubmit(onSubmit)} />
      <LinkText
        text={t('BackToHomeScreen')}
        style={styles.blackBoldText}
        onPress={() => navigation.navigate('Home', { name: 'Home' })}
      />
      {/* <LinkText
        text="test screen OTP cái"
        style={styles.blackBoldText}
        onPress={() => navigation.navigate('RegisterOTPScreen', { name: 'RegisterOTPScreen' })}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  firstImageWithTextContainer: {
    padding: 7,
    color: '#087738',
  },
  blackBoldText: {
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  formContainer: {
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
    flexShrink: 0,
    maxHeight: '53%',
    flexGrow: 0.1,
  },
  //   loadingOverlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   zIndex: 999,
  // },
});