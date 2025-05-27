import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';

import SearchBar from './SearchBar';
import TopNavBar from './TopNavBar';

import { useNavigation } from '@react-navigation/native';

import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { TextSizes } from '../utils/TextSizes';
import { Spacing } from '../utils/Spacing';
import { Colors } from '../utils/Colors';

const Banner = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../assets/images/banner.jpg')}
            style={styles.bannerBgImage}
            resizeMode="cover"
        >
            <View style={styles.bannerContainer}>
                {/* Top Nav Bar */}
                <TopNavBar />

                {/* Slogan */}
                <View style={styles.sloganContainer}>
                    {/* <FontAwesome name="quote-left" size={24} color={Colors.primary} /> */}
                    <Text style={styles.slogan}>
                        Find Your Space. Live Your Dream.
                    </Text>
                    {/* <FontAwesome name="quote-right" size={24} color={Colors.primary} /> */}
                </View>

                {/* Search Bar */}
                <SearchBar />
            </View>

        </ImageBackground>
    );
};

export default Banner;


const styles = StyleSheet.create({
    bannerBgImage: {
        width: '100%',
        height: 250,
        // position: 'relative',
    },

    bannerContainer: {
        // flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
        width: '100%',
        height: 250,
        backgroundColor: Colors.overlay2,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingTop: 40,
    },

    sloganContainer: {
        flexDirection: 'row',
        gap: 4,
        // marginTop: 32,
        // marginBottom: 16,
    },

    slogan: {
        fontSize: TextSizes.xl,
        fontWeight: 'bold',
        color: Colors.textWhite,
        marginBottom: 4,
    },

});
