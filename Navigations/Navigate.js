import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ForgotPassword from '../screens/ForgotPassword';
import Loading from '../screens/Loading';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import OrderDetails from '../screens/OrderDetails';
import OrderScreen from '../screens/OrderScreen';
import Cart from '../screens/Cart';

const Stack1 = createStackNavigator();

const OrderStack = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="Home" component={Home} />
      <Stack1.Screen name="OrderScreen" component={OrderScreen} />
      <Stack1.Screen name="OrderDetails" component={OrderDetails} />
    </Stack1.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
 
const TabContent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="#0C1430"
      labeled={true}
      barStyle={{ backgroundColor: '#EB8430' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <Ionicons name={'home'} size={20} color={color} />;
          } else if (route.name === 'Cart') {
            return <AntDesign name="shoppingcart" size={22} color="black" />;
          }else if (route.name === 'Profile') {
            return <Feather name="user" size={24} color="black" />
          }
        },
      })}>
      <Tab.Screen name="Home" component={OrderStack} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
