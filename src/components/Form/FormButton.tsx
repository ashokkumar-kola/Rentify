import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, TextSizes } from '../../constants';

const FormButton = ({ title, onPress, loading, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={Colors.primary} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    backgroundColor: Colors.white100,
    paddingVertical: 16,
    borderRadius: 26,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: TextSizes.base,
  },
});

export default FormButton;
