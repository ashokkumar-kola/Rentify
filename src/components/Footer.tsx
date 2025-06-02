import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../constants/Colors'; // Assuming you have a Colors file
import { TextSizes } from '../constants/TextSizes';

export default function Footer() {
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <LinearGradient
      colors={['#2c5abf', '#1b3e8b']} // Darker blue gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.footer}
    >
      <Text style={styles.logo}>Rentify</Text>

      <View style={styles.linkContainer}>
        {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
          <TouchableOpacity key={link}>
            <Text style={styles.linkText}>{link}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => openLink('https://facebook.com')}>
          <FontAwesome name="facebook" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://instagram.com')}>
          <FontAwesome name="instagram" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://twitter.com')}>
          <FontAwesome name="twitter" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.copyText}>© 2025 Rentify. All rights reserved.</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: TextSizes.lg,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 16,
  },
  linkText: {
    color: '#fff',
    fontSize: TextSizes.sm,
    marginHorizontal: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  icon: {
    marginHorizontal: 10,
  },
  copyText: {
    color: '#ccc',
    fontSize: TextSizes.xs,
    textAlign: 'center',
  },
});
