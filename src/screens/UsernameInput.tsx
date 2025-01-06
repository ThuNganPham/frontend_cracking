import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');



const sendUserNameScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

const sendUserName = async () => {
  try {
    
  } catch (error) {

  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tên tài khoản</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Tên"
        style={styles.input}
      />
      <CustomButton title="Gửi" onPress={sendUserName} />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingTop: height * 0.1,
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    marginBottom: width * 0.04,
    color: '#000',
  },
  input: {
    width: '100%',
    height: width * 0.15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: width * 0.05,
    fontSize: width * 0.045,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default sendUserNameScreen;
