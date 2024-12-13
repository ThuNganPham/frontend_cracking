import { StackNavigationProp } from '@react-navigation/stack';

interface LogIn {
  LogInScreen: undefined;
  LogInAccount: { name: string }; 
}

export interface RootStackParamList extends LogIn {
  Home: undefined;
  CreateAccount: { name: string };
}

export type NavigationProps = StackNavigationProp<RootStackParamList>;

// Component usage:
// Alert.alert(t('SignUpSuccess'), response.data.message || 'Đăng ký thành công!');
// navigation.navigate('LogInScreen', { name: 'LogInAccount' });  // Điều hướng đúng
