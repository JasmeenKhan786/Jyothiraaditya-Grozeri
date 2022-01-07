import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase';
import db from '../config';
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      account: '',
      address: '',
      image: '',
      email: firebase.auth().currentUser.email,
      id: '',
    };
  }
  getProfile = async () => {
    var temp = await db
      .collection('users')
      .where('email', '==', this.state.email)
      .get();

    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
       
        name: obj.name,
        address: obj.address,
        
        id: doc.id,
      });
    });
  };

  componentDidMount = () => {
    this.getProfile();
  };
  onSubmit = () => {
    db.collection('users').doc(this.state.id).update({
      name: this.state.name,
      address: this.state.address,
      account: this.state.account,
    });
    alert('Changes Saved!')
  };

  render() {
    return (
      <ScrollView style={styles.container}>
       
        <View style={styles.header}>
           <Entypo
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
            name="arrow-bold-left"
            size={28}
            color="black"
          />
          <Text style={styles.headerTitle}>Profile</Text>
           <View style={{ backgroundColor: '#eb8430' }}>
            <MaterialIcons
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.replace('Login');
                  })
                  .catch((error) => {
                    alert('Something went wrong! Try later!')
                  });
              }}
              name="logout"
              size={24}
              color="black"
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            margin: 10,
          }}>
          <Image style={{width:200,height:200, alignSelf:'center',}}
                       source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnEJMVl_X5oCazLzxmea5i_K9jZS_DJYKHw&usqp=CAU',
            }}
          />
        </View>
      

        <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
          Name
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            height: 30, 
            backgroundColor: '#eee',
            borderColor: '#eee',
            paddingLeft: 10,
          }}
          value={this.state.name}
          placeholder="John Doe"
          onChangeText={(val) => {
            this.setState({ name: val });
          }}
        />

        <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
          Email
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            height: 30,
            backgroundColor: '#eee',
            borderColor: '#eee',
            paddingLeft: 10,
          }}
          value={this.state.email}
          placeholder="johndoe@gmail.com"
        />
        <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
          Address
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            height: 30,
            backgroundColor: '#eee',
            borderColor: '#eee',
            paddingLeft: 10,
          }}
          value={this.state.address}
          placeholder="35, Juhu, Mumbai"
          onChangeText={(val) => {
            this.setState({ address: val });
          }}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 40,
            borderColor: '#EB8430',
            borderWidth: 1,
            borderRadius: 5,
            width: '40%',
            backgroundColor: '#EB8430',
            padding: 6,
          }}
          onPress={this.onSubmit}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor:'white'
  }, 
  header: {
    width: '100%',
    height: 80,
    paddingTop: 40, 
    paddingHorizontal: 20,
    backgroundColor: '#EB8430',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
  },
});
