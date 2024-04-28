import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatScreen, HomeScreen, LoginScreen, SignUpScreen } from "./screens";

import {Provider} from "react-redux";
import Store from "./context/store";
import AddToChat from "./screens/AddToChat";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={Store}>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddToChat" component={AddToChat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
