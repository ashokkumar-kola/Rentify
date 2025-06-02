import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { api } from '../../api/apiClient';

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const defaultProfile = require('../../assets/images/profiles/default.png');

    const fetchUserData = async () => {
        try {
        const userToken = await AsyncStorage.getItem('userData');
            let parsedUser = null;

            if (userToken) {
                parsedUser = JSON.parse(userToken);
                setUser(parsedUser);

                const response = await api.get(`/user/find/${parsedUser._id}`);
                if (response.data.success) {
                    setUser(response.data.user);
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchUserData();
  }, []);

    const handleVerify = async (type) => {
    try {
        if (!user?._id) {return;}

        const endpoint = type === 'email'
        ? `/verify-email/${user._id}`
        : `/verify-phone/${user._id}`;

        const res = await api.post(endpoint);
        if (res.data.success) {
        Alert.alert(`${type === 'email' ? 'Email' : 'Phone'} verification initiated`);
        } else {
        Alert.alert(res.data.message || 'Verification failed');
        }
    } catch (err) {
        console.error(err);
        Alert.alert('Verification request failed');
    }
    };


  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007bff" />;
  }
// uri: user?.profile_image ? user.profile_image : 
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={ defaultProfile }
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <FontAwesome name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.name}>{user?.user_name || 'User Name'}</Text>
      </View>

      <View style={styles.verificationContainer}>
    <View style={styles.verifyRow}>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => handleVerify('email')}
        >
        <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.verifyRow}>
        <Text style={styles.email}>{user?.phone_no || 'No phone'}</Text>
        <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => handleVerify('phone')}
        >
        <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
    </View>
    </View>


      <View style={styles.menu}>
        <MenuItem icon="user" label="Edit Profile" onPress={() => {}} />
        {/* <MenuItem icon="lock" label="Add Pin" onPress={() => {}} />
        <MenuItem icon="cog" label="Settings" onPress={() => {}} />
        <MenuItem icon="users" label="Invite a Friend" onPress={() => {}} /> */}
        <MenuItem icon="sign-out" label="Logout" color="red" onPress={() => {}} />
      </View>
    </View>
  );
};

const MenuItem = ({ icon, label, color = '#333', onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <FontAwesome name={icon} size={20} color={color} style={{ width: 25 }} />
    <Text style={[styles.menuText, { color }]}>{label}</Text>
    <FontAwesome name="angle-right" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 20,
    position: 'absolute',
    right: 120,
    top: 80,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  email: {
    fontSize: 16,
    // backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    color: '#333',
  },
  menu: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 2,
    marginVertical: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',

  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  verificationContainer: {
  marginTop: 20,
  marginHorizontal: 20,
  backgroundColor: '#fff',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 15,
  elevation: 2,
},
verifyRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
  padding: 8,
  borderBottomColor: '#33333322',
    borderBottomWidth: 1,
},
verifyButton: {
  backgroundColor: '#007bff',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
},
verifyText: {
  color: '#fff',
  fontWeight: 'bold',
},

});

export default ProfileScreen;
