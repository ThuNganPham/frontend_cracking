import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../MyApp/src/screens/HomeScreen';
import RegisterScreen from '../MyApp/src/screens/RegisterScreen'; 
import LogInScreen from '../MyApp/src/screens/LogInScreen';
import ForgetPasswordScreen from '../MyApp/src/screens/ForgetPassScreen';
import Toast from 'react-native-toast-message';
import OTPscreen from '../MyApp/src/screens/OTPscreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SucessTestScreen from '../MyApp/src/screens/SuccessTest';
import jwt_decode from 'jwt-decode';


const Stack = createStackNavigator();

interface DecodedToken {
  exp: number;
  [key: string]: any;
}
declare module 'jwt-decode' {
  export default function jwt_decode<T>(token: string | null): T;
}

const linking = {
  prefixes: ['https://ShiSo.app', 'com.googleusercontent.apps.399164063066-qr9i2slnuaqd8h8cq53m2nu7droii99i:/'], // Add your app's custom scheme and web URL
  config: {
    screens: {
      Home: '',
      CreateAccount: 'register', // Route: https://ShiSo.app/register
      LogInAccount: 'login',     // Route: https://ShiSo.app/login
      ForgetPasswordScreen: 'forgot-password', // Route: https://ShiSo.app/forgot-password
    },
  },
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkToken = async () => {
      try {
          const token = await AsyncStorage.getItem('access_token');
          if(token){
          const decodedToken: DecodedToken = jwt_decode(token);  
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
        } else {
              setIsLoggedIn(false);
        }
      } catch (error){
          console.log('Lỗi gì mà checkToken không đc đây:', error)
          setIsLoggedIn(false);
      }
    }
    checkToken();
  }, [])
  if (isLoggedIn === null){
      return null;
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={ isLoggedIn ? 'SucessTestScreen': 'Home'}>
         {isLoggedIn ? (
          // Nếu đã đăng nhập
          <>
            <Stack.Screen name="SucessTestScreen" component={SucessTestScreen} options={{ headerShown: false }} />
          </>
        ) : (
          // Nếu chưa đăng nhập
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SucessTestScreen" component={SucessTestScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAccount" component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="LogInAccount" component={LogInScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="OTPscreen" component={OTPscreen} options={{ headerShown: false }}/>
      </>
    )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
