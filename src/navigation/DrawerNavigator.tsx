import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/navigator/CustomDrawer';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/properties/PropertiesScreen';

const Drawer = createDrawerNavigator();

const renderCustomDrawer = (props: any) => <CustomDrawer {...props} />;

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      screenOptions={{
        drawerStyle: {
          width: '80%',
        },
        overlayColor: 'rgba(0, 0, 0, 0.3)', // touch outside to close
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
