import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../MyApp/src/screens/HomeScreen';
import RegisterScreen from '../MyApp/src/screens/RegisterScreen'; 
import LogInScreen from '../MyApp/src/screens/LogInScreen';
import ForgetPasswordScreen from '../MyApp/src/screens/ForgetPassScreen'
import Toast from 'react-native-toast-message';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="LogInAccount" component={LogInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
