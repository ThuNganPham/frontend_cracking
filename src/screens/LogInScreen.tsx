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
import { KeyboardAvoidingView, Platform } from 'react-native';
import { getValidationSchema } from '../validation/LogInSchema';
import { RegisterInput } from '../components/Form';
import { showToast } from '../utils/toastHelper'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoading } from '../contexts/LoadingContext'; 

const { height } = Dimensions.get('window');

interface LoginData {
  username: string;
  password: string;
}

export default function LogInScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);
  const { isLoading, setIsLoading } = useLoading();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(validationSchema, { abortEarly: false }),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      console.log('Login data:', data);
      const response = await axiosClient.post('users/login', {
        username: data.username,
        password: data.password,
      },{ withCredentials: true });

      const accessToken = response.data.access_token;
      await AsyncStorage.setItem('accessToken', accessToken);

      showToast('success', t('Success'), t('LoginSuccess'));
      console.log(accessToken);
      navigation.navigate('SucessTestScreen', { name: 'SucessTestScreen' });
    } catch (error: any) {
      console.error('Error during registration:', error.response?.data || error.message);
      showToast('error', t('Error'), error.response?.data?.message || t('LogInFailed'));
    } finally {
        setIsLoading(false); // Tắt loading khi đã có phản hồi từ server
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>
        <Title text={t('ScreenWelcome')} />
      </View>
      <View style={styles.formContainer}>
        <Rectangle imageSource={<ShisoAuthenImage />} />
        <RegisterInput control={control} name="username" placeholder={t('Username')} />
        <RegisterInput control={control} name="password" placeholder={t('Password')} secureTextEntry />
      </View>

      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <CustomButton title={t('LogIn')} onPress={handleSubmit(onSubmit)} />
      <LinkText
        text={t('ForgotPassword')}
        style={styles.blackBoldText}
        onPress={() => navigation.navigate('ForgetPasswordScreen', { name: 'ForgetPasswordScreen' })}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#248A50" />
        </View>
      )}
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
    marginBottom: 50,
    // flexShrink: 0,
    // maxHeight: '48.8%',
    flexGrow: 0.01, 
   },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});
