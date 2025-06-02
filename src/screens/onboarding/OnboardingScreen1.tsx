import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import images from '../../assets/images';
import { Colors } from '../../constants';

const OnBoardingScreen1 = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Image
                    source={images.logo}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.mainHeading}>Welcome to Rentify</Text>

                <Image
                    source={images.onboarding1}
                    style={styles.illustration}
                    resizeMode="contain"
                />

                <Text style={styles.subHeading}>Find your new way to home</Text>

                <Text style={styles.paragraph}>
                    Rentify helps you find your dream home with ease. Browse listings, schedule tours, and sign leases—all in one place.
                </Text>
            </View>

            <TouchableOpacity 
                style={styles.nextButton} 
                onPress={() => navigation.navigate('OnBoard2')}
            >
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors.background,
    },
    skipButton: {
        position: 'absolute',
        top: 56,
        right: 24,
        zIndex: 1,
    },
    skipText: {
        fontSize: 16,
        color: Colors.grey400,
        fontFamily: 'Inter-Medium',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 160,
        height: 52,
        marginBottom: 32,
    },
    mainHeading: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        marginBottom: 32,
        textAlign: 'center',
        color: Colors.black,
    },
    illustration: {
        width: '100%',
        height: 300,
        marginBottom: 24,
    },
    subHeading: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
        marginBottom: 16,
        color: Colors.grey600,
    },
    paragraph: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        color: Colors.grey500,
        paddingHorizontal: 24,
        marginBottom: 24,
        lineHeight: 24,
    },
    nextButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 28,
        alignSelf: 'center',
        marginBottom: 40,
        width: '100%',
        maxWidth: 200,
    },
    nextText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
    },
});

export default OnBoardingScreen1;
