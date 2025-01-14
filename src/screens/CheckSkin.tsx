import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions,ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import VanillaText from '../components/VanillaText';
import Title from '../components/Title'
import LinkText from '../components/LinkText'
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/navigation';
import '../../i18n';
import axiosClient from '../api/axiosClient';
import { showToast } from '../utils/toastHelper'; 
import { useLoading } from '../contexts/LoadingContext'; 
import WhiteRectangle from '../components/whiteFrame'

const { width, height } = Dimensions.get('window');

export default function CheckSkinScreen() {
  const { t } = useTranslation();


  
        


  return (
    <View style={styles.container}>
        <WhiteRectangle>
            <Title style={styles.titleText} text={t('title-checkSkin')}  />
        </WhiteRectangle>
        <VanillaText>          
               <Text style={styles.italicText}>{'tô vào vùng da đó ...'}</Text>
        </VanillaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#EDF9ED',
    alignItems: 'center',
    paddingTop: height * 0.1, 
    paddingHorizontal: width * 0.05, 
  },
   titleText: {
    fontSize: width * 0.06,
  },
  italicText:{
    color: '#248A50'
  }
});