import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './Navigations/Navigate'
import db from "./config"
export default class App extends React.Component {
  render(){  
  return (
   <NavigationContainer>
        <MainStack/> 
   </NavigationContainer>  
  ); 
  }
} 

