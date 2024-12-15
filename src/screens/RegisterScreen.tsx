import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Input } from 'react-native-elements';
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
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup'; // Thêm yup để tạo schema validation
import { yupResolver } from '@hookform/resolvers/yup'; // Sử dụng yup với react-hook-form
import '../../i18n';

const { height } = Dimensions.get('window');

interface RectangleProps {
  imageSource: React.ReactNode;
}
// Tạo schema validation với Yup
const validationSchema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required') 
    .matches(
      /^[A-Za-z\d!@#$%^&*()_+=[\]{};:'",.<>?/-]{5,}$/,
      'Username must be at least 5 characters and contain only letters, digits, and special characters'
    ),

  password: Yup.string()
    .required('Password is required') 
    .matches(
      /^(?!.*\s)(?=.*[!@#$%^&*()_+=[\]{};:'",.<>?/-])[A-Za-z\d!@#$%^&*()_+=[\]{};:'",.<>?/-]{5,}$/,
      'Password must be at least 5 characters, contain at least one special character, and no spaces'
    ),
  securityAnswer: Yup.number()
    .required('Security Answer is required')
    .typeError('Security Answer must be a number'),
});

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      securityAnswer: 0,
    },
    resolver: yupResolver(validationSchema), // Kết nối validation schema với react-hook-form
  });

  const onSubmit = async (data: any) => {
    try {
      console.log('Register data:', data);
      const startTime = Date.now();

      const response = await axiosClient.post('users/register', {
        username: data.username,
        password: data.password,
        securityAnswer: data.securityAnswer,
      });

      const elapsedTime = Date.now() - startTime;
      console.log(elapsedTime, 'ms');

      Toast.show({
        type: 'success',
        text1: t('Success'),
        text2: response.data.message || t('Register'),
      });

      navigation.navigate('LogInAccount', { name: 'LogInAccount' });
    } catch (error: any) {
      console.error('Error during registration:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: t('Error'),
        text2: error.response?.data?.message || t('RegisterFailed'),
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>
        <Title text={t('RegisterScreenWelcome')} />
      </View>
    <View style={styles.formContainer}>
        <Rectangle imageSource={<ShisoAuthenImage />} />

        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              placeholder={t('Username')}
              value={field.value}
              onChangeText={field.onChange}
              containerStyle={styles.inputContainer} 
              inputContainerStyle={styles.inputInnerContainer} 
              inputStyle={styles.inputText} 
              placeholderTextColor="#248A50" 
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              placeholder={t('Password')}
              value={field.value}
              onChangeText={field.onChange}
              secureTextEntry
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputInnerContainer} // Style cho container bên trong (loại bỏ underline)
              inputStyle={styles.inputText} // Style chữ bên trong ô input
              placeholderTextColor="#248A50" // Màu placeholder
            />
          )}
        />
        <Controller
          control={control}
          name="securityAnswer"
          render={({ field }) => (
            <Input
              placeholder={t('SecurityNumber')}
              value={field.value ? String(field.value) : ''} // Hiển thị số, nếu không có giá trị thì hiển thị chuỗi rỗng
              onChangeText={value => field.onChange(value ? parseFloat(value) : 0)} // Chuyển đổi giá trị nhập vào thành số
              keyboardType="numeric"
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputInnerContainer} // Style cho container bên trong (loại bỏ underline)
              inputStyle={styles.inputText} // Style chữ bên trong ô input
              placeholderTextColor="#248A50" // Màu placeholder
            />
          )}
        />
      </View>

            {/* Hiển thị lỗi validation nếu có */}
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      {errors.securityAnswer && <Text style={styles.errorText}>{errors.securityAnswer.message}</Text>}

      <CustomButton
        title={t('SignUp')}
        onPress={handleSubmit(onSubmit)}
      />

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
  },
  inputContainer: {
    height: 47,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
    inputInnerContainer: {
    borderBottomWidth: 0, // Loại bỏ underline
  },
  inputText: {
    fontSize: 14, // Kích thước chữ nhỏ hơn
    color: '#333', // Màu chữ (nếu muốn)
  }
});


