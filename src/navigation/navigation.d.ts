import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined; 
  CreateAccount:  { name: string }; 
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
