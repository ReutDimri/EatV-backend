import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import SelectLocationScreen from './screens/SelectLocationScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} options={{ headerShown: false }} />
       
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
/* <Stack.Screen name="SelectLocation" component={SelectLocationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RouteOptions" component={RouteOptionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Trip" component={TripScreen} options={{ headerShown: false }} />>*/
export default App;
