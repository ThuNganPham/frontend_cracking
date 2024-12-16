import React from 'react';
import { Input } from 'react-native-elements';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';

interface InputProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric';
  placeholderTextColor?: string;
}

export const RegisterInput = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  placeholderTextColor = '#248A50',
}: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          placeholder={placeholder}
          value={field.value}
          onChangeText={field.onChange}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.inputText}
          placeholderTextColor={placeholderTextColor}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 47,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  inputInnerContainer: {
    borderBottomWidth: 0, 
  },
  inputText: {
    fontSize: 14,
    color: '#333',
  },
});
