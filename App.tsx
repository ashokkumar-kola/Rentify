import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';


const App = () => {
  return (
    <NavigationContainer>
        {/* <DrawerNavigator /> */}
        <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
