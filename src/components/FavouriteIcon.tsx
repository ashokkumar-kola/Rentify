import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function FavoriteCard() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/sample.jpg')}
      style={styles.background}
      imageStyle={styles.image}
    >
      {/* Heart icon in top-right */}
      <TouchableOpacity
        onPress={() => setIsFavorite(!isFavorite)}
        style={styles.heartIcon}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite ? 'red' : 'white'}
        />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Nature Trail</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    borderRadius: 16,
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
