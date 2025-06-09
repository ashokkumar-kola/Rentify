import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants';

import { api } from '../../api/apiClient';
import { decodeJwt } from '../../utils/jwt';

const DrawerLikeScreen = () => {
  const navigation = useNavigation();
//   const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const getUserDataFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('User token:', token);

      if (token) {
        const decoded = decodeJwt(token);
        console.log('Decoded token:', decoded);

        if (decoded?.id) {
          const response = await api.get(`/users/${decoded.id}`);

          if (response.data.success) {
            setUserData(response.data.data);
            console.log('User Data:', userData);
          }
        }
      }
    } catch (error) {
      console.error('Error decoding token or fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  getUserDataFromToken();
}, []);

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    // Optionally clear all:
    await AsyncStorage.clear();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    console.error('Error during logout:', error);
    Alert.alert('Failed to logout. Please try again.');
  }
};


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Logo and Close Button */}
      <View style={styles.logoContainer}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="close" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouchable} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/images/RentifyLogoPrimary.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Menu Area */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.profileSection}>
          <FontAwesome name="user-circle" size={60} color="#666" />
          <Text style={styles.name}>{userData?.full_name || 'User'}</Text>
          {/* <Text style={styles.subName}>{userData?.lastName || ''}</Text> */}
        </View>

        <View style={styles.menuList}>
          {[
            { label: 'My profile', icon: 'user', route: 'Profile', routeParams: undefined },
            { label: 'My address', icon: 'map-marker', route: 'Address', routeParams: undefined },
            { label: 'My properties', icon: 'home', route: 'MyProperties', routeParams: { userId: userData?._id } },
            { label: 'My Rentals', icon: 'building', route: 'Rentals', routeParams: undefined },
            { label: 'My Documents', icon: 'file-text', route: 'Documents', routeParams: undefined },
            { label: 'Property cards', icon: 'th-large', route: 'PropertyCards', routeParams: undefined },
            { label: 'Help center', icon: 'question-circle', route: 'Help', routeParams: undefined },
            { label: 'Setting', icon: 'cog', route: 'Settings', routeParams: undefined },
            { label: 'Privacy policy', icon: 'shield', route: 'Privacy', routeParams: undefined },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => navigation.navigate(item.route, item.routeParams)}>
              <FontAwesome name={item.icon} size={20} color="#333" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerLikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    // paddingTop: 40,
  },
  logoContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    left: 10,
    zIndex: 1,
  },
  logo: {
        width: 80,
        height: 48,
        position: 'absolute',
        top: 14,
        left: '55%',
        transform: [{ translateX: -50 }],
        zIndex: 1,
    },
  scrollArea: {
    paddingTop: 70,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subName: {
    fontSize: 14,
    color: '#888',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    gap: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
  },
});
