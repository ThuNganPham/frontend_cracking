import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from '../MyApp/src/contexts/AuthContext';
import HomeScreen from '../MyApp/src/screens/HomeScreen';
import RegisterScreen from '../MyApp/src/screens/RegisterScreen';
import LogInScreen from '../MyApp/src/screens/LogInScreen';
import ForgetPasswordScreen from '../MyApp/src/screens/ForgetPassScreen';
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';
import SucessTestScreen from '../MyApp/src/screens/SuccessTest';
import { LoadingProvider, useLoading } from '../MyApp/src/contexts/LoadingContext'; 
import CheckSkinScreen from '../MyApp/src/screens/CheckSkin';
import OTPScreen from './src/screens/OTPscreen';
import CircleSkinProcess from '../MyApp/src/screens/CircleSkinProcess';
import { CustomHeader } from './src/components/CustomHeader';
import { CircleProvider } from '../MyApp/src/contexts/CircleContext'; 
import RegisterOTPScreen from '../MyApp/src/screens/RegisterOTP'
import { PointsProvider } from "../MyApp/src/contexts/PointsOnBodyContext"
import { SeverityProvider } from "../MyApp/src/contexts/SeverityContext"

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const linking = {
  prefixes: ['https://ShiSo.app', 'com.googleusercontent.apps.399164063066-qr9i2slnuaqd8h8cq53m2nu7droii99i:/'],
  config: {
    screens: {
      Home: '',
      CreateAccount: 'register',
      LogInAccount: 'login',
      ForgetPasswordScreen: 'forgot-password',
    },
  },
};

const AppNavigator = () => {
  const { isLoggedIn } = useAuth(); // Sử dụng hook `useAuth` để lấy trạng thái đăng nhập

  if (isLoggedIn === null) {
    // Hiển thị màn hình chờ hoặc loading nếu chưa xác định trạng thái
    return null;
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        // Nếu đã đăng nhập, chỉ hiển thị màn hình SucessTestScreen
        <Stack.Screen name="SucessTestScreen" component={SucessTestScreen} options={{ headerShown: false }} />
      ) : (
        // Nếu chưa đăng nhập, hiển thị các màn hình liên quan đến xác thực
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LogInAccount" component={LogInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OTPscreen" component={OTPScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterOTPScreen" component={RegisterOTPScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SucessTestScreen" component={SucessTestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CheckSkinScreen" component={CheckSkinScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CircleSkinProcess" component={CircleSkinProcess} 
          options={{
              header: () => <CustomHeader />,
            }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SeverityProvider>
    <PointsProvider>
    <CircleProvider>
    <AuthProvider>
       <LoadingProvider> 
          <NavigationContainer linking={linking}>
            <AppNavigator />
            <Toast />
          </NavigationContainer>
      </LoadingProvider>
    </AuthProvider>
    </CircleProvider>
    </PointsProvider>
    </SeverityProvider>
  );
};

export default App;
