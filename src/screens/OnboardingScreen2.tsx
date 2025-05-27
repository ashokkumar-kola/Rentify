import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../utils/Colors';

const OnBoardingScreen2 = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <Image
                source={require('../assets/images/RentifyLogoPrimary.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.mainHeading}>Live in your Dream Home</Text>

            <Image
                source={require('../assets/images/Buy_House_SVG.png')}
                style={styles.illustration}
                resizeMode="contain"
            />

            <Text style={styles.subHeading}>Find your new way to home</Text>

            <Text style={styles.paragraph}>
                Rentify helps you find your dream home with ease. Browse listings, schedule tours, and sign leases—all in one place.
            </Text>

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('OnBoard3')}>
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnBoardingScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 24,
    },
    skipText: {
        fontSize: 16,
        color: '#888',
    },
    logo: {
        width: 160,
        height: 52,
        marginBottom: 24,
    },
    mainHeading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: Colors.black200,
    },
    illustration: {
        width: 350,
        height: 300,
        marginBottom: 16,
    },
    subHeading: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
        color: '#555',
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        paddingHorizontal: 16,
        marginBottom: 32,
    },
    nextButton: {
        backgroundColor: Colors.primary, // '#4F46E5'
        paddingVertical: 12,
        paddingHorizontal: 48,
        borderRadius: 28,
    },
    nextText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
