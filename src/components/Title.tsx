import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

type TitleProps = {
  text: string;
  style?: StyleProp<TextStyle>
};

const Title: React.FC<TitleProps> = ({ text , style}) => {
  const [fontsLoaded] = useFonts({
    'Lalezar': require('../../assets/fonts/Lalezar/Lalezar-Regular.ttf'), 
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Text style={[styles.title, style, { fontFamily: 'Lalezar' }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#248A50',
  },
});

export default Title;
