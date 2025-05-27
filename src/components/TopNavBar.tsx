import React from 'react';

import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    // Platform 
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../utils/Colors';
import { Spacing } from '../utils/Spacing';
// import { TextSizes } from '../utils/TextSizes';

const TopNavBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Menu icon */}
            <TouchableOpacity style={styles.iconTouchable} onPress={() => {}}>
                <FontAwesome name="bars" size={24} color={Colors.primary} />
            </TouchableOpacity>

            {/* Logo */}
            <TouchableOpacity style={styles.iconTouchable} onPress={() => navigation.navigate('Home')}>
                <Image
                    source={require('../assets/images/RentifyLogoPrimary.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Login/User icon */}
            <TouchableOpacity
                style={styles.userIconWrapper}
                onPress={() => navigation.navigate('Login')}
                accessible
                accessibilityLabel="Login"
            >
                <FontAwesome name="user" size={16} color={Colors.white200} />
            </TouchableOpacity>
        </View>
    );
};

export default TopNavBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // 'rgba(0,0,0,0.15)'
        // elevation: 4,
        zIndex: 999,
    },
    logo: {
        width: 120,
        height: 48,
    },
    iconTouchable: {
        padding: 8,
    },
    userIconWrapper: {
        width: 32,
        height: 32,
        backgroundColor: Colors.primary,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
