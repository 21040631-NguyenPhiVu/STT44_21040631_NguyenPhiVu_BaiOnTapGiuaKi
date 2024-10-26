import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen_01 from './screens/Screen_01';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen_01" component={Screen_01} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
