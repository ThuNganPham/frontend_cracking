import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { NavigationProps } from '../navigation/navigation';
import { useTranslation } from 'react-i18next';
import VanillaText from '../components/VanillaText'


import '../../i18n';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProps>(); 

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language); 
  };


  return (
    <View style={styles.container}>
        <VanillaText>
            <Text style={styles.boldItalicText}>{t('VerificationCode')} </Text>
        </VanillaText>
        <VanillaText>
            <Text style={styles.boldItalicText}>{t('VerificationDescription')} </Text>
        </VanillaText>
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
    boldItalicText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#248A50',
  },
});
