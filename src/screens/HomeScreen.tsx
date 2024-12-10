import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import ImageWithText from '../components/ImageWithText';
import CustomButton from '../components/CustomButton';
import LinkText from '../components/LinkText';
import ImageHomeScreen1 from '../components/svg-JSX/firstHomescreen'; 
import ImageHomeScreen2 from '../components/svg-JSX/secondHomescreen'; 
import { useTranslation } from 'react-i18next'; 
import '../../i18n';



const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (language:string) => {
    i18n.changeLanguage(language); // Thay đổi ngôn ngữ
  };
  return (
    <View style={styles.container}>
      {/* Bọc ImageWithText đầu tiên trong View và thêm paddingTop */}
      <View style={styles.firstImageWithTextContainer}>
        <ImageWithText 
          imageSource={<ImageHomeScreen1 />}
          text={ <Text style={styles.italicText}>{t('homescreenLine1')}</Text>}
        />
      </View>
      <ImageWithText
        imageSource={<ImageHomeScreen2 />}
        text={
          <Text style={styles.italicText}>
            {t('homescreenLine2')}{' '}
            <Text style={styles.boldItalicText}>{t('homescreenLine3')}</Text>
            {t('homescreenLine4')}
          </Text>
        }
      />
      <CustomButton
        title={t('createAccountButton')} 
        onPress={() => console.log('Tạo tài khoản!')}
      />
      <LinkText
        text={t('alreadyHaveAccount')}
        style={styles.blackBoldText} 
        onPress={() => console.log('Đi đến màn hình đăng nhập')}
      />
      <LinkText
        text={t('loginWithGmail')}
        style={styles.boldText}
        onPress={() => console.log('Đăng nhập với Gmail')}
      />
    <View style={styles.languageSwitchContainer}>
          <LinkText
            text="ENV"
            onPress={() => handleLanguageChange('en')}
          />
          <Text style={styles.separator}> | </Text>
          <LinkText
            text="VI"
            onPress={() => handleLanguageChange('vi')}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF9ED',
    padding: 30,
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
    color: 'black', 
  },
  boldText: {
    fontWeight: 'bold', 
  },
  firstImageWithTextContainer: {
    paddingTop: height * 0.05, // Tự động thêm paddingTop theo chiều cao màn hình (5%)
  },
  languageSwitchContainer: {
    flexDirection: 'row', 
    alignSelf: 'center', 
  },
  separator: {
    marginHorizontal: 5, // Khoảng cách giữa ENV và |
    fontSize: 16,
    color: '#248A50',
    alignSelf: 'center', 

  },
});
