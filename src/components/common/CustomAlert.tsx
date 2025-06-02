import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, TextSizes } from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomAlert = ({
  visible,
  title,
  message,
  confirmText = 'OK',
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="check-circle"
              size={50}
              color={Colors.primary}
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={onConfirm || onClose}
          >
            <Text style={styles.confirmButtonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: Colors.white100,
    borderRadius: 20,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: TextSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: TextSizes.base,
    color: Colors.grey800,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: Colors.white100,
    fontSize: TextSizes.base,
    fontWeight: '600',
  },
});

export default CustomAlert;
