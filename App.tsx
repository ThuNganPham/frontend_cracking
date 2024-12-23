import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../MyApp/src/screens/HomeScreen';
import RegisterScreen from '../MyApp/src/screens/RegisterScreen'; 
import LogInScreen from '../MyApp/src/screens/LogInScreen';
import ForgetPasswordScreen from '../MyApp/src/screens/ForgetPassScreen';
import Toast from 'react-native-toast-message';
import OTPscreen from '../MyApp/src/screens/OTPscreen'

const Stack = createStackNavigator();

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
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LogInAccount" component={LogInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="OTPscreen" component={OTPscreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
