import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CircleContext } from '../../src/contexts/CircleContext'; 
import RightArrow from '../../assets/fi-rr-arrow-right.svg';
import { NavigationProps } from '../navigation/navigation';
import { useNavigation } from '@react-navigation/native'; 

const { height, width } = Dimensions.get('window');

export function CustomHeader() {
  const { count } = useContext(CircleContext); 
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.header}>
      <RightArrow style={styles.icon} onPress={() => navigation.navigate('Home', { name: 'Home' })}/>
      <Text style={styles.title}>{count} điểm đã chọn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 0.14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: width * 0.1,
    marginTop: width * 0.1,
    marginLeft: width * 0.1,
  },
  title: {
    color: '#248A50',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: width * 0.1,
  },
});
