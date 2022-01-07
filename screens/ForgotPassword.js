import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '8%',
        }}>
        <View style={{ marginRight: '80%' }}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text
            onPress={() => {
              this.props.navigation.replace('Login');
            }}>
            Back
          </Text>
        </View>

        <Text
          style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 10 }}>
          Reset Password
        </Text>

        <Text
          style={{
            justifyContent: 'flex-end',
            marginTop: '5%',
            marginLeft: '5%',
          }}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password.
        </Text>

        <TextInput
          style={{
            margin: 30,
            padding: 10,
            width: '70%',
            height: 40,
            borderWidth: 1,
            borderRadius: 6,
          }}
          placeholder="Enter Email"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%',
            backgroundColor: '#eb8430',
            width: '70%',
            height: 30,
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => {
            if(this.state.email){
              firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .then(() => { 
                  alert('Reset link sent on your email!')
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert(errorMessage)
                });
              }else{
                alert('Please enter a valid email!')
              }
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Send Reset Email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
