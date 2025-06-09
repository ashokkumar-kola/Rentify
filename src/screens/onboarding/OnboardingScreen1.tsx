import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';
import images from '../../assets/images';

import styles from './styles';

const OnBoardingScreen1 = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Skip button top-right */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Home')}
        accessibilityLabel="Skip to home"
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={images.logo}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Rentify Logo"
        />

        <Text style={styles.mainHeading}>Welcome to Rentify</Text>

        <Image
          source={images.onboarding1}
          style={styles.illustration}
          resizeMode="contain"
          accessibilityLabel="Home illustration"
        />

        <Text style={styles.subHeading}>Find your new way to home</Text>

        <Text style={styles.paragraph}>
          Rentify helps you find your dream home with ease. Browse listings,
          schedule tours, and sign leases—all in one place.
        </Text>
      </View>

      {/* Next Button */}
        <LinearGradient
            colors={[Colors.blue100, Colors.blue300]}
            style={styles.nextButton}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
        >
            <TouchableOpacity
                // style={styles.nextButton}
                onPress={() => navigation.navigate('OnBoard2')}
                accessibilityLabel="Go to next onboarding screen"
            >
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </LinearGradient>
    </SafeAreaView>
  );
};

export default OnBoardingScreen1;
