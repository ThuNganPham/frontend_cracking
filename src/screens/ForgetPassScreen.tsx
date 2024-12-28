import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
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

const { height } = Dimensions.get('window');

interface ResetData {
  username: string;
  password: string;
  phoneNumber: string; 
}

export default function ForgetPasswordScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      phoneNumber: '',
    },
    resolver: yupResolver(validationSchema, { abortEarly: false }),
  });

  const onSubmit = async (data: ResetData) => {
  try {
    console.log('Reset data:', data);
    const response = await axiosClient.post('users/reset-password', {
      username: data.username,
      new_password: data.password,
      phoneNumber: data.phoneNumber,
    });

    showToast('success', t('Success'), response.data.message || t('LoginSuccess'));

    navigation.navigate('OTPscreen', { name: 'OTPscreen' });
  } catch (error: any) {
    console.error('Error during registration:', error.response?.data || error.message);
    showToast('error', t('Error'), error.response?.data?.message || t('LogInFailed'));
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>
        <Title text={t('ScreenWelcome')} />
      </View>
      <KeyboardAvoidingView style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Rectangle imageSource={<ShisoAuthenImage />} />
        <RegisterInput control={control} name="username" placeholder={t('Username')} />
        <RegisterInput control={control} name="password" placeholder={t('NewPassWord')} secureTextEntry />
        <RegisterInput
          control={control}
          name="securityAnswer"
          placeholder={t('SecurityNumber')}
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>

      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

      <CustomButton title={t('ResetPassword')} onPress={handleSubmit(onSubmit)} />
      <LinkText
        text={t('BackToLogin')}
        style={styles.blackBoldText}
        onPress={() => navigation.navigate('LogInAccount', { name: 'LogInAccount' })}
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
    height : "46%"

  },
});
