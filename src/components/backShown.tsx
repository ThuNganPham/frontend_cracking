import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet , GestureResponderEvent} from 'react-native';

interface BackShownProps {
  title: string;
  onPress: (() => void) | ((event: GestureResponderEvent) => void);
  color?: string;
}

const BackShown: React.FC<BackShownProps> = ({ title, onPress, color = '#fff' }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isPressed ? '#054B20' : color },
        isPressed && styles.pressedShadow, 
      ]}
      onPress={onPress}
      activeOpacity={0.8} 
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
    width: 120,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#248A50',
  },
  text: {
    color: '#248A50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pressedShadow: {
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BackShown;
