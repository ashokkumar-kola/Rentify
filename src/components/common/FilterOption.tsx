// components/FilterOption.tsx

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterOption = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterOption;

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  label: {
    color: '#333',
  },
  labelSelected: {
    color: 'white',
    fontWeight: '500',
  },
});
