import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import Banner from '../components/Banner';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import CustomButton from '../components/common/Button';

import { useNavigation } from '@react-navigation/native';

const properties = [
  {
    id: 1,
    title: 'Modern 2BHK Apartment in Downtown',
    location: 'PQR, Near by abc',
    price: '1500.00',
    deposit: '3000.00',
    property_type: 'flat',
    bhk_type: '2BHK',
    bathrooms: 2,
    size_sqft: 950,
    image: require('../assets/images/simple-home.png'),
  },
  {
    id: 2,
    title: 'Modern 2BHK Apartment in Downtown',
    location: 'PQR, Near by abc',
    price: '1500.00',
    deposit: '3000.00',
    property_type: 'flat',
    bhk_type: '2BHK',
    bathrooms: 2,
    size_sqft: 950,
    image: require('../assets/images/simple-home.png'),
  },
  {
    id: 3,
    title: 'Modern 2BHK Apartment in Downtown',
    location: 'PQR, Near by abc',
    price: '1500.00',
    deposit: '3000.00',
    property_type: 'flat',
    bhk_type: '2BHK',
    bathrooms: 2,
    size_sqft: 950,
    image: require('../assets/images/simple-home.png'),
  },
];


const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <Banner />

                {/* Properties */}
                <View style = { styles.container }>
                    {properties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                    ))}
                </View>

                {/*  */}
                <CustomButton
                    title="Next"
                    onPress={() => navigation.navigate('Properties')}
                    backgroundColor="#34D399"
                    textColor="#000"
                />

                {/* Footer */}
                <Footer />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#2c3e50',
    },
    subHeader: {
        fontSize: 20,
        marginVertical: 10,
        color: '#34495e',
    },
    card: {
        marginBottom: 16,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 6,
    },
    title: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: '600',
    },
    price: {
        fontSize: 14,
        color: '#2ecc71',
    },
});

export default HomeScreen;
