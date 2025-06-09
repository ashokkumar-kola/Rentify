// components/AnimatedTabBar.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Platform
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // default import

const icons: any = {
  Home: 'home',
  Filter: 'search',
  AddProperty: 'add',
  Wishlist: 'favorite',
  Profile: 'person'
};

const activeIcons: any = {
  Home: 'home',
  Filter: 'home', // or another icon name for active Filter
  AddProperty: 'add',
  Wishlist: 'favorite',
  Profile: 'person'
};

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Icon = isFocused ? activeIcons[route.name] : icons[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
        const iconName = isFocused ? activeIcons[route.name] : icons[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <MaterialIcons name={iconName} color={isFocused ? 'white' : '#ddd'} size={24} />
            <Text style={[styles.label, isFocused && styles.focusedLabel]}>
              {label.replace('AddProperty', 'Add')}
            </Text>
          </TouchableOpacity>
        );
    flexDirection: 'row',
    backgroundColor: '#4C74FF',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 4
  },
  focusedLabel: {
    color: 'white',
    fontWeight: '600'
  }
});
