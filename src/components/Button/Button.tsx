import React from 'react';
import { TouchableOpacity, View, Text, Image, ActivityIndicator, StyleSheet, GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { styles } from './ButtonStyles';
interface Props {
  isLoading: boolean;
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  icon: ImageSourcePropType
}

const Button: React.FC<Props> = ({ isLoading, onPress, text, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color="#fff" testID="loader" />
      ) : (
        <View style={styles.buttonContainer}>
          <Image source={icon} style={styles.btnIcon} />
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;