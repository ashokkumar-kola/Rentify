import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';

import ProfileScreen from '../screens/user/ProfileScreen';
import AddPropertyScreen from '../screens/user/AddPropertyScreen';
import WishlistScreen from '../screens/user/WishlistScreen';

import FilterScreen from '../screens/Explore/FilterScreen';

import CustomTabBar from '../components/navigator/AnimatedTabBar';
// import Explore from '../screens/home/ExploreScreen';

const Tab = createBottomTabNavigator();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTabBar}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Filter" component={FilterScreen} />
      <Tab.Screen name="AddProperty" component={AddPropertyScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
