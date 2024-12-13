import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Title from '../components/Title';
import Rectangle from '../components/Rectangle';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import { NavigationProps } from '../navigation/navigation';
import { useTranslation } from 'react-i18next';
import ShisoAuthenImage from '../components/svg-JSX/shisoAuthen';
import '../../i18n';

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProps>(); 

  return (
    <View style={styles.container}>
      <View style={styles.firstImageWithTextContainer}>       
        <Title text={t('RegisterScreenWelcome')} />
      </View>
       <Rectangle
        imageSource={<ShisoAuthenImage/>}
        placeholders={[t('Username'), t('Password')]} 
        onChange= { () => console.log() }
      />
      <CustomButton
        title={t('LogIn')}
        onPress={() => console.log('AAAAA')} 
      />
      <LinkText
        text={t('ForgotPassword')}
        style={styles.blackBoldText}
        onPress={() => console.log('AAAAA')} 
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
    padding : 10,
    color: '#087738',

  },
    blackBoldText: {
    fontWeight: 'bold',
    color: 'black',
  },

});