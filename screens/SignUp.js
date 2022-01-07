import * as React from 'react';
import {
  Text,
  View,
  StyleSheet, 
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import db from '../config';
import firebase from 'firebase';

//functional components
export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      address:'',
      password: '',
      confirmpassword: '',

    };
  }
  signup = (emailId, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password) 
      .then((response) => {
        Alert.alert('Welcome to Grozeri!');
        var user = response.user;
        firebase.auth().currentUser.updateProfile({displayName:this.state.name})

        db.collection('users').add({ email: emailId, name: this.state.name, address:this.state.address });

        this.props.navigation.replace('Login');
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
        
          <View
            style={{
              flexDirection: 'row',
              marginTop: '10%',
              justifyContent: 'space-between',
              marginLeft: '5%',
            }}>
             <Image
            
               source={require('../assets/GROSER.png')}
              
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text
                onPress={() => {
                  this.props.navigation.replace('Login');
                }}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginHorizontal: 0,
                }}>
                Login
              </Text>
              <Text
                onPress={() => {}}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginHorizontal: 10,
                }}>
                Sign Up
              </Text>
            </View>
          </View>

           <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              marginLeft: '5%',
              marginTop: 20,
              color:"#FF7D26"
            }}>
            GroZeri
          </Text>

          <Text
            style={{
              marginLeft: '5%',
              fontWeight: 'bold',
              fontSize: 40,
              marginTop: 20,
            }}>
            Create your account
          </Text>

          <Text
            style={{
              marginLeft: '5%',
              marginTop: 10,
              color: 'grey',
              marginHorizontal: 10,
            }}>
            Connect with us and find amazing products chosen especially for you.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 2,
              width: '85%',
              alignSelf: 'center',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="mail" size={24} color="black" />
            <TextInput
              onChangeText={(value) => {
                this.setState({ email: value });
              }}
              style={{ width: '90%', paddingLeft: 10, height: 30 }}
              placeholder="Email"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 2,
              width: '85%',
              alignSelf: 'center',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="person-circle-outline" size={24} color="black" />
            <TextInput
              onChangeText={(value) => {
                this.setState({ name: value });
              }}
              style={{ width: '90%', paddingLeft: 10, height: 30 }}
              placeholder="Name"
            />
          </View>

           <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 2,
              width: '85%',
              alignSelf: 'center',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
           <FontAwesome name="home" size={24} color="black" />
            <TextInput
              onChangeText={(value) => {
                this.setState({ address: value });
              }}
              style={{ width: '90%', paddingLeft: 10, height: 30 }}
              placeholder="Address"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 2,
              width: '85%',
              alignSelf: 'center',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="lock" size={24} color="black" />
            <TextInput
              secureTextEntry={true}
              onChangeText={(value) => {
                this.setState({ password: value });
              }}
              style={{ width: '80%', paddingLeft: 10, height: 30 }}
              placeholder="Password"
            />
            <FontAwesome name="eye-slash" size={24} color="black" />
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 2,
              width: '85%',
              alignSelf: 'center',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="lock" size={24} color="black" />
            <TextInput
              onChangeText={(value) => {
                this.setState({ confirmpassword: value });
              }}
              secureTextEntry={true}
              style={{ width: '80%', paddingLeft: 10, height: 30 }}
              placeholder="Confirm Password"
            />
            <FontAwesome name="eye-slash" size={24} color="black" />
          </View>

          <TouchableOpacity 
            onPress={() => {
              if (
                this.state.email &&
                this.state.password &&
                this.state.confirmpassword &&
                this.state.name && this.state.address
              ) {
                if (this.state.password === this.state.confirmpassword) {
                  this.signup(this.state.email, this.state.password);
                } else {
                  alert('Passwords dont match!');
                }
              } else {
                alert('Please fill all the details!');
              }
            }}
            style={{
              width: '80%',
              backgroundColor: '#eb8430',
              height: 40,
              alignSelf: 'center',
              marginTop: 40,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '80%',
              backgroundColor: 'white',
              height: 40,
              alignSelf: 'center',
              marginVertical: 30,
              borderRadius: 10,
              justifyContent: 'space-evenly',
              elevation: 10,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesign name="google" size={24} color="black" />
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
