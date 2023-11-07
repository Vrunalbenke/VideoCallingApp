import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from '../screens/ContactScreen';
import Calling from '../screens/CallingScreen';
import CallScreen from '../screens/CallScreen';
import IncomingCall from '../screens/IncomingCallScreen';
import LoginScreen from '../screens/LoginScreen';
import { storage } from '../constant';

const Stack = createNativeStackNavigator();


const Navigation = () => {
    console.log('in Navigation')
    const route = storage.getBoolean('logged_in') ? 'Contacts' : 'Login';

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={route}>
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Contacts' component={Contacts} options={{ headerShown: false }} />
                <Stack.Screen name='Calling' component={Calling} options={{ headerShown: false }} />
                <Stack.Screen name='CallScreen' component={CallScreen} options={{ headerShown: false }} />
                <Stack.Screen name='IncomingCall' component={IncomingCall} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigation;

