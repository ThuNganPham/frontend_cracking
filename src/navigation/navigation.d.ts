import { StackNavigationProp } from '@react-navigation/stack';

export interface RootStackParamList {
  Home: { name?: string }; 
  CreateAccount: { name: string }; 
  LogInScreen: { name: string };  
  LogInAccount: { name: string }; 
  ForgetPasswordScreen: { name: string }; 
  OTPscreen: { name: string};
  SucessTestScreen: {name : string};
  ContinueWithNumberPhone: { name : string}; 
  UsernameInputScreen: { name : string}
}

export type NavigationProps = StackNavigationProp<RootStackParamList>;
