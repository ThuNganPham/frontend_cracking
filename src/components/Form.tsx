import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { Controller } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <View style={styles.inputContainer}>
            {
              isFocused || field.value
                ? <Text style={styles.label}>{placeholder}</Text>
                : null
            }
          <Input
            placeholder={!isFocused ? placeholder : ''}
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            containerStyle={styles.inputWrapper}
            inputContainerStyle={styles.inputInnerContainer}
            inputStyle={styles.inputText}
            placeholderTextColor={placeholderTextColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 25,
    position: 'relative',
  },
  inputWrapper: {
    height: 47,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    overflow: 'hidden',
  },
  inputInnerContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    fontSize: 14,
    color: '#333',
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 10,
    fontSize: 12,
    color: '#248A50',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 5,
    zIndex: 1,
    borderRadius:10,
    borderColor: '#339933',
    borderWidth: 3,
  },
});
