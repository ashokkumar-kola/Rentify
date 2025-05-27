import React from 'react';

import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
// import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen1 from './src/screens/OnboardingScreen1';
import OnBoardingScreen2 from './src/screens/OnboardingScreen2';
import OnBoardingScreen3 from './src/screens/OnboardingScreen3';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
// import FilterScreen from './src/screens/FilterScreen';
// import PropertiesScreen from './src/screens/PropertiesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="OnBoard1" component={ OnBoardingScreen1 } />
            <Stack.Screen name="OnBoard2" component={ OnBoardingScreen2 } />
            <Stack.Screen name="OnBoard3" component={ OnBoardingScreen3 } />
            <Stack.Screen name="Home" component={ HomeScreen } />
            <Stack.Screen name="Login" component={ LoginScreen } />
            <Stack.Screen name="Register" component={ RegisterScreen } />
            {/* <Stack.Screen name="Filter" component={ FilterScreen } />
            <Stack.Screen name="Properties" component={ PropertiesScreen } /> */}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
