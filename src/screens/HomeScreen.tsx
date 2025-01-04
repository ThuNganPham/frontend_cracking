import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Rectangle from '../components/Image';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import ImageHomeScreen1 from '../components/svg-JSX/firstHomescreen';
import ImageHomeScreen2 from '../components/svg-JSX/secondHomescreen';
import { NavigationProps } from '../navigation/navigation';
import { useTranslation } from 'react-i18next';
import GoogleLoginButton from "../firebase/LogInWggButton";
import VanillaText from '../components/VanillaText'
import RectangleCenter from '../components/ImageCenter'
import LogoGoogle from '../components/svg-JSX/GGicon'

import '../../i18n';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProps>(); 

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language); 
  };

   const handleLoginSuccess = (user: any) => {
    console.log("Logged in user successfully:", user);
    navigation.navigate('SucessTestScreen', { name: 'SucessTestScreen' });

  };

  const handleLoginError = (error: any) => {
    console.error("Login failed:", error);
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>
          <RectangleCenter style={styles.containerImgWtextFirst} imageSource={<ImageHomeScreen1 />} />
          <VanillaText>          
               <Text style={styles.italicText}>{t('homescreenLine1')} </Text>
          </VanillaText>
      </View>
      <RectangleCenter style={styles.containerImgWtextFirst} imageSource={<ImageHomeScreen2 />} />
      <VanillaText>
          <Text style={styles.italicText}>{t('homescreenLine2')} </Text>
          <Text style={styles.boldItalicText}>{t('homescreenLine3')} </Text>
          <Text style={styles.italicText}>{t('homescreenLine4')}</Text>
      </VanillaText>

      {/* <CustomButton
        title={t('createAccountButton')}
        onPress={() => navigation.navigate('CreateAccount', {name: 'CreateAccount'})} 
      /> */}
      <LinkText
        text={t('alreadyHaveAccount')}
        style={styles.blackBoldText}
        onPress={() => navigation.navigate('ContinueWithNumberPhone', {name: 'ContinueWithNumberPhone'})} 
      />
      {/* <RectangleCenter style={styles.containerImgWtextFirst} imageSource={<LogoGoogle />} /> */}
        <GoogleLoginButton
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
        <View style={styles.languageSwitchContainer}>
            <LinkText text="EN" onPress={() => handleLanguageChange('en')} />
            <Text style={styles.separator}> | </Text>
            <LinkText text="VI" onPress={() => handleLanguageChange('vi')} />
        </View>
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
  containerImgWtextFirst:{
    alignSelf: 'center',


  },
  italicText: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#333',
  },
  boldItalicText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  blackBoldText: {
    fontWeight: 'bold',
    color: '#248A50',
    fontSize: 16,

  },
  boldText: {
    fontWeight: 'bold',
  },
  firstImageWithTextContainer: {
    paddingTop: height * 0.01, 
  },
  languageSwitchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  separator: {
    marginHorizontal: 2,
    marginTop:4,
    fontSize: 16,
    color: '#248A50',
    alignSelf: 'center',
  },
});
