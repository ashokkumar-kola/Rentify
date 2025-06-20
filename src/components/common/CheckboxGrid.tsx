import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CheckboxGrid = ({ options, selected, onToggle }) => {
  return (
    <View style={styles.grid}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => onToggle(item)}
          style={[styles.box, selected.includes(item) && styles.selectedBox]}
        >
          <Text style={[styles.label, selected.includes(item) && styles.selectedText]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CheckboxGrid;

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 5,
  },
  selectedBox: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  label: { color: '#333' },
  selectedText: { color: '#fff' },
});
