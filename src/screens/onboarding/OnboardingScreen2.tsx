import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import images from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';

import styles from './styles';

const OnBoardingScreen2 = ({ navigation }: { navigation: any }) => {
    return (
        <SafeAreaView style={styles.container}>
        {/* Skip button */}
        <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('Home')}
            accessibilityLabel="Skip onboarding and go to Home"
        >
            <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.content}>
        <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Rentify logo"
        />

        {/* Optional Main Heading */}
        {/* <Text style={styles.mainHeading}>Live in your Dream Home</Text> */}

        <Image
            source={images.onboarding2}
            style={styles.illustration}
            resizeMode="contain"
            accessibilityLabel="Property earning illustration"
        />

        <Text style={styles.subHeading}>List. Rent. Earn.</Text>

        <Text style={styles.paragraph}>
            Turn your property into profit with Rentify—hassle-free listings, faster tenants—all from one convenient platform.
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
                onPress={() => navigation.navigate('OnBoard3')}
                accessibilityLabel="Go to next onboarding screen"
            >
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </LinearGradient>
        </SafeAreaView>
    );
};

export default OnBoardingScreen2;
