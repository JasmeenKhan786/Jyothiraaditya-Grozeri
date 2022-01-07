import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,FlatList
} from 'react-native';
import db from '../config';
import { Entypo } from '@expo/vector-icons';
// onPress={()=>{
//   this.props.navigation.navigate('OrderDetails',{id:a.id})
// }}

// var resp= db.collection('Products').doc(this.props.route.params.id).get();
//resp.data() - state
export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  getProducts = async () => {
    var resp = await db
      .collection('Products')
      .where('category', '==', this.props.route.params.category)
      .get();

    resp.docs.map((d) => {
      var temp = this.state.products;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ products: temp });
    });
  };

  componentDidMount() {
    var cat = this.props.route.params.category;
    this.getProducts();
  }
  render() {
    if(this.state.products.length===0){
      return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
      
      <View
            style={{
              width: "100%",
              height: 80,
              paddingTop: 36,
              paddingHorizontal: 20,
              backgroundColor: "#EB8430",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Entypo
              onPress={() => {
                this.props.navigation.navigate("Home");
              }} 
              name="arrow-bold-left"
              size={28}
              color="black"
            />
            <Text style={{ color: "black", fontSize: 20 }}>{this.props.route.params.category}</Text>
            <View style={{ backgroundColor: "#eb8430" }}></View>
          </View>

          <Text style={{fontSize:18, textAlign:'center', marginTop:'30%', marginHorizontal:'5%'}}>Sorry! No Products found for this category!</Text>
          </View>
      )

    }
    else{
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      
      <View
            style={{
              width: "100%",
              height: 80,
              paddingTop: 36,
              paddingHorizontal: 20,
              backgroundColor: "#EB8430",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Entypo
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
              name="arrow-bold-left"
              size={28}
              color="black"
            />
            <Text style={{ color: "black", fontSize: 20 }}>{this.props.route.params.category}</Text>
            <View style={{ backgroundColor: "#eb8430" }}></View>
          </View>
          
          <FlatList
          data={this.state.products} 
          keyExtractor={(item, index)=>{
            return index.toString() 
          }} 
          numColumns={2} 
          renderItem={({item})=>{
            var a = item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('OrderDetails', {
                      id: a.id,
                    }); 
                  }}
                  style={{ 
                    width: '40%',
                    marginLeft: 20,
                    height: 195,
                    marginTop: 20,
                    borderRadius: 15,
                    backgroundColor: '#E9F8EE',
                  }}>
                  <Image
                    source={{ uri: a.image }}
                    style={{
                      width: 90,
                      height: 90,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      marginTop: 10,
                      color: '#88878B',
                    }}>
                    {a.name}
                  </Text>
                  <View style={{ marginLeft: 10, width: '70%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                      ₹{a.price}/{a.quantity}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
          }}
          />

         
     
      </View>
    );
        }
  }
}

const styles = StyleSheet.create({});
