import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
//Component
//JSX - JS and HTML/XML

//props - it helps to pass values between different class/components
//states -

// this.setState({name:'Jasmeen'})

//json - {key:value, key1:value1}

//Lifecycle
//Mounting Updating Unmounting

//Main axis -justifyContent
//Cross axis - alignItems

//width, height, alignSelf, flex, justifyContent, alignItems, margin, padding

//functional components
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = async (email, password) => {
    var resp = await db
      .collection('users')
      .where('email', '==', this.state.email)
      .get();
    if (resp.docs.length === 1) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert('Welcome Back!');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } 
    else {
      Alert.alert('Warning', "Not a user with us!")
    }
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
                onPress={() => {}}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginHorizontal: 10,
                }}>
                Login
              </Text>
              <Text
                onPress={() => {
                  this.props.navigation.replace('SignUp');
                }}
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
              marginTop: 70,
              color:"#FF7D26"
            }}>
            GroZeri
          </Text>

          <Text
            style={{
              marginLeft: '5%',
              fontWeight: 'bold',
              fontSize: 26,
              marginTop: 10,
            }}>
            Welcome Back!
          </Text>

          <Text
            style={{
              marginLeft: '5%',
              marginTop: 10,
              color: 'grey',
              marginHorizontal: 10,
            }}>
            Connect with us and get amazing products delivered at your door
            step.
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
              style={{ width: '90%', paddingLeft: 10, height: 30 }}
              placeholder="Email"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
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
              style={{ width: '80%', paddingLeft: 10, height: 30 }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => {
                this.setState({ password: val });
              }}
            />
            <FontAwesome name="eye-slash" size={24} color="black" />
          </View>

          <Text
            style={{ color: 'blue', marginTop: 20, marginLeft: '7%' }}
            onPress={() => {
              this.props.navigation.replace('ForgotPassword');
            }}>
            Forgot Password?
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (this.state.email && this.state.password) {
                this.login(this.state.email, this.state.password);
              } else {
                alert('Please fill all details');
              }
            }}
            style={{
              width: '80%',
              backgroundColor: '#eb8430',
              height: 40,
              alignSelf: 'center',
              marginTop: 50,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              alert('This feature is coming soon!');
            }}
            style={{
              width: '80%',
              backgroundColor: 'white',
              height: 40,
              alignSelf: 'center',
              marginTop: 30,
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
              Login with Google
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
