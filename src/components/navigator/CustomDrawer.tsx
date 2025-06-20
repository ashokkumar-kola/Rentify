import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants';

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <View style={styles.profileSection}>
          <FontAwesome name="user" size={48} color={Colors.primary} />
          <Text style={styles.name}>Hachibur</Text>
          <Text style={styles.subName}>Rahman</Text>
        </View>

        <View style={styles.menuList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => {}} style={styles.bottomItem}>
          <FontAwesome name="cog" size={20} />
          <Text style={styles.bottomText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.bottomItem}>
          <FontAwesome name="shield" size={20} />
          <Text style={styles.bottomText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f2f2f2',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  subName: {
    color: '#666',
    fontSize: 14,
  },
  menuList: {
    marginTop: 20,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 20,
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  bottomText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
