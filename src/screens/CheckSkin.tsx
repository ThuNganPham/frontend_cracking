
import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions,ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import Title from '../components/Title'
import SqrButton from '../components/sqrButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/navigation';
import '../../i18n';
import WhiteRectangle from '../components/whiteFrame'
import ColorOutline from '../../assets/colorHumanBody.svg'
import TransParentOutline from '../../assets/transparentHumanBody.svg'

const { width, height } = Dimensions.get('window');

export default function CheckSkinScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>(); 

  
        


  return (
    <View style={styles.container}>
        <WhiteRectangle>
            <Title style={styles.titleText} text={t('title-checkSkin')}  />
        </WhiteRectangle>
        <View style={styles.svgContainer}>
            <ColorOutline
              width={width * 0.65}
              height={height * 0.65}
              style={[styles.svg, styles.colorOutline]}
            />
            <TransParentOutline
              width={width * 0.65}
              height={height * 0.65}
              style={[styles.svg, styles.transParentOutline]}
            />
        </View>  
        <View style={styles.buttonContainer}>
              <SqrButton
              title='Bắt đầu chọn'
              onPress={() => navigation.navigate('CircleSkinProcess', {name: 'CircleSkinProcess'})} 
              />  
        </View>  
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#EDF9ED',
    alignItems: 'center',
    paddingTop: height * 0.06, 
    paddingHorizontal: width * 0.05, 
  },
   titleText: {
    fontSize: width * 0.06,
  },
  italicText:{
    color: '#248A50'
  },
   svgContainer: {
    position: 'relative',
    width: width * 0.7,
    height: height * 0.65,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  colorOutline: {
    zIndex: 2,
    opacity : 0,
  },
  transParentOutline: {
    zIndex: 1,
  },
  buttonContainer: {
    
  }
});