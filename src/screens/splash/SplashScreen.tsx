import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoard1');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/RentifyLogoPrimary.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 60,
    },
    tagline: {
        color: '#64748B',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 12,
        letterSpacing: 4,
    },
});

export default SplashScreen;
