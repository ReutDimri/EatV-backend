import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import BusinessOwnerScreen from './screens/BusinessOwnerScreen';
import RoutePlannerScreen from './screens/RoutePlannerScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="BusinessOwner" component={BusinessOwnerScreen} />
        <Stack.Screen name="RoutePlanner" component={RoutePlannerScreen} />

       </Stack.Navigator>
    </NavigationContainer>
  
  );
};

export default App;
