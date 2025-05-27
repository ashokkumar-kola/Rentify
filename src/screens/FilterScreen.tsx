import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Banner from '../components/Banner';

const FilterScreen = () => {
  return (
    <View>
        <Banner />
      <Text>FilterScreen</Text>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#002299',
    },
});
