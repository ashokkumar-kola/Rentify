import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';

import OnBoardingScreen1 from '../screens/onboarding/OnboardingScreen1';
import OnBoardingScreen2 from '../screens/onboarding/OnboardingScreen2';
import OnBoardingScreen3 from '../screens/onboarding/OnboardingScreen3';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import HomeScreen from '../screens/home/HomeScreen';
import DrawerLikeScreen from '../screens/home/DrawerLikeScreen';

import ProfileScreen from '../screens/home/ProfileScreen';
import EditProfileScreen from '../screens/home/EditProfileScreen';
import ChangePasswordScreen from '../screens/home/ChangePasswordScreen';

import MyPropertiesScreen from '../screens/properties/MyPropertiesScreen';

import FilterScreen from '../screens/home/FilterScreen';

import PropertiesScreen from '../screens/properties/PropertiesScreen';
import FilteredPropertiesScreen from '../screens/properties/FilteredProperties';

import PropertyCardsScreen from '../screens/properties/PropertyCardsScreen';

import TabNavigator from './TabNavigator';
// import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
    Splash: undefined;
    OnBoard1: undefined;
    OnBoard2: undefined;
    OnBoard3: undefined;

    // Home: undefined;
    MainTabs: undefined;

    Profile: undefined;
    DrawerStyleScreen: undefined
    Login: undefined;
    Register: undefined;
    Filters: undefined;
    Properties: undefined;
    FilteredProperties: undefined;
    EditProfile: undefined;
    ChangePassword: undefined;
    MyProperties: {userId: string} | undefined;
    PropertyCards: undefined;
    // Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="OnBoard1" component={OnBoardingScreen1} />
            <Stack.Screen name="OnBoard2" component={OnBoardingScreen2} />
            <Stack.Screen name="OnBoard3" component={OnBoardingScreen3} />

            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ animation: 'fade', gestureEnabled: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ animation: 'fade', gestureEnabled: false }}
            />

            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            {/* <Stack.Screen name="MainTabs" component={TabNavigator} /> */}
            <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{ gestureEnabled: false }}
            />

            <Stack.Screen
                name="DrawerStyleScreen"
                component={DrawerLikeScreen}
                options={{
                    animation: 'slide_from_left',
                    gestureEnabled: false,
                }}
            />

            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    headerShown: true,
                }}
            />

            <Stack.Screen
                name="MyProperties"
                component={MyPropertiesScreen}
                options={{
                    headerShown: true,
                    title: 'My Properties',
                }}
            />

            <Stack.Screen
                name="Filters"
                component={FilterScreen}
                options={{
                    animation: 'slide_from_bottom',
                    gestureEnabled: false,
                }}
            />

            <Stack.Screen
                name="Properties"
                component={PropertiesScreen}
            />
            <Stack.Screen
                name="FilteredProperties"
                component={FilteredPropertiesScreen}
                options={{ title: 'Filtered Properties' }}
            />

            <Stack.Screen
                name="PropertyCards"
                component={PropertyCardsScreen}
                options={{ headerShown: true, title: 'Property Cards' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
