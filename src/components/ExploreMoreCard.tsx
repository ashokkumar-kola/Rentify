import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { TextSizes } from '../constants/TextSizes';
import { useNavigation } from '@react-navigation/native';

const ExploreMoreCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Properties')}>
      <Image
        source={require('../assets/images/Home_SVG.png')} 
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore More Properties</Text>
        <Text style={styles.subtitle}>Find homes that suit your lifestyle</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreMoreCard;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 160,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    alignSelf: 'center',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: TextSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: TextSizes.sm,
    color: '#666',
    marginTop: 4,
  },
});
