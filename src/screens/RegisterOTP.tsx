import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions,ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import VanillaText from '../components/VanillaText';
import Title from '../components/Title'
import LinkText from '../components/LinkText'
import CustomButton from '../components/CustomButtonRegister';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/navigation';
import '../../i18n';
import axiosClient from '../api/axiosClient';
import { showToast } from '../utils/toastHelper'; 
import { useLoading } from '../contexts/LoadingContext'; 
import { useAuth } from '../contexts/AuthContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';



const { width, height } = Dimensions.get('window');

interface DecodedToken {
  username: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export default function RegisterOTPScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const { isLoading, setIsLoading } = useLoading();
  const { username, setIsLoggedIn, setUsername } = useAuth();

  interface PostOTPData {
     username: string,
     otp: string
}
  const [otp, setOtp] = useState(['', '', '', '','','']); // Trạng thái mã OTP
  const inputRefs = useRef<Array<TextInput | null>>([]); // Tạo refs cho các ô input

  const handleOtpChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    // Tự động chuyển focus
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (text === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
 const handleResendOTP = async () => {
  try {
    setIsLoading(true);
    await axiosClient.post('users/get-otp-forget-password', { username }); // Backend kiểm tra username
    showToast('success', t('Success'), t('OTPSent'));
  } catch (error: any) {
    console.error('Error resending OTP:', error.response?.data || error.message);
    showToast('error', t('Error'), t('ResendOTPFailed'));
  } finally {
    setIsLoading(false);
  }
};

const handleVerifyOTP = async () => {
  const otpCode = otp.join(''); 

  if (otpCode.length !== 6) {
    showToast('error', t('Error'), t('OTPInvalid')); 
    return;
  }

  try {
    setIsLoading(true);
     const response = await axiosClient.post('users/verify-otp', {
      username,
      otp: otpCode,
    });

        // Lấy token lưu vào AsyncStorage rồi Cập nhật trạng thái trong AuthContext
    const { access_token } = response.data.access_token; 
    await AsyncStorage.setItem('access_token', access_token); 
    await AsyncStorage.setItem('@username', username ?? ''); // nếu null nó cho epty

    const decodedToken: DecodedToken = jwt_decode(access_token);

    
    setUsername(decodedToken.username);
    setIsLoggedIn(true);
    showToast('success', t('Success'), t('RegisterAccountSucess'));
    navigation.navigate('SucessTestScreen', { name: 'SucessTestScreen' });
  } catch (error: any) {
    console.error('Error during OTP verification:', error.response?.data || error.message);
    showToast(
      'error',
      t('Error'),
      error.response?.data?.message === 'OTP expired'
        ? t('OTPexpired')
        : error.response?.data?.message || t('ResetAccountFailed')
    );
  } finally {
    setIsLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Title style={styles.titleText} text={t('VerificationCode')}  />
      <VanillaText>
        <Text style={styles.normalText}>{t('VerificationDescription')} </Text>
      </VanillaText>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Gán ref cho từng ô input
            style={styles.otpInput}
            value={value}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(value, index);
              }
            }}
            keyboardType="numeric"
            maxLength={1} // Chỉ cho phép nhập 1 ký tự
            textAlign="center"
          />
        ))}
      </View>
      <VanillaText>
              <Text style={styles.normalText}>{t('ReceiveCode')}</Text>
              <LinkText text={t('Resend')} style={styles.greyUnderlineText} onPress={(handleResendOTP)}/>
      </VanillaText>
      <LinkText text={t('Goback')} style={styles.greyUnderlineText} onPress={() => navigation.navigate('CreateAccount', { name: 'CreateAccount' })}/>
      <CustomButton title={t('Verify')} onPress={(handleVerifyOTP)} />

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
    flex:1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingTop: height * 0.1, 
    paddingHorizontal: width * 0.05, 
  },
  normalText: {
    fontSize: width * 0.04, 
    color: '#248A50',
  },
  titleText: {
    fontSize: width * 0.09,
    marginBottom: width * - 0.02,
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: height * 0.01, 
    justifyContent: 'space-between',
  },
  otpInput: {
    width: width * 0.12,
    height: width * 0.12, 
    marginHorizontal: width * 0.01, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: width * 0.05, 
    color: '#000',
  },
  greyUnderlineText: {
    color: '#535DD3',
    textDecorationLine: 'underline',
    fontSize: width * 0.04, 

  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});