import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
//Array
//Map and ScrollView
//Flatlist
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

const category = [
  {
    id: "01",
    name: "Vegetables",
    icon: require("../assets/broccoli.png"),
    color: "#E5FCE2",
  },
  {
    id: "02",
    name: "Fruits",
    icon: require("../assets/fruit.png"),
    color: "#FDE2FE",
  },
  {
    id: "03",
    name: "Dairy",
    icon: require("../assets/cheese.png"),
    color: "#FFFFE3",
  },
  {
    id: "04",
    name: "Meat",
    icon: require("../assets/ham.png"),
    color: "#FFEEEB",
  },
  {
    id: "05",
    name: "Nuts",
    icon: require("../assets/almond.png"),
    color: "#d2eff2",
  },
  {
    id: "06",
    name: "Spices",
    icon: require("../assets/spices.png"),
    color: "pink",
  },
];

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  getProducts = async () => {
    var resp = await db.collection("Products").limit(3).get();
    resp.docs.map((d) => {
      var temp = this.state.products;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ products: temp });
    });
  };

  componentDidMount() {
    this.getProducts();
  }
  render() {
    if (this.state.products.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
              marginHorizontal: "5%",
            }}
          >
            We are getting the best products for you!
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View>
            <Text
              style={{
                color: "black",
                fontSize: 24,
                marginLeft: 15,
                marginTop: 40,
              }}
            >
              Welcome,
              {firebase.auth().currentUser.displayName
                ? " " + firebase.auth().currentUser.displayName 
                : ""}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              <Text style={{ color: "grey", marginTop: 10, fontSize: 15 }}>
                What would you buy today?
              </Text>
              <View style={{ backgroundColor: "#eb8430", borderRadius: 7, padding:5 }}>
                <AntDesign
                  onPress={() => {
                    this.props.navigation.navigate("Cart");
                  }}
                  name="shoppingcart"
                  size={35}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",  
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#ddd",
                justifyContent: "center",
                alignItems: "center", 
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={()=>{
                alert('This feature is coming soon!')
              }}>
              <FontAwesome name="search" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  width: "85%",
                  paddingLeft: 20,
                }}
                placeholder="Search products"
              />
            </View>
          </View>
          <View>
            <Image
              style={{
                width: 300,
                height: 170,
                alignSelf: "center",
                marginTop: 20,
                borderRadius: 20,
              }}
              source={require("../assets/Banner.png")}
            />
          </View>

          <ScrollView>  
            <ScrollView horizontal={true}>
              {category.map((a) => {
                return (
                  <View style={{marginHorizontal:20  }} key={a.id}> 
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("OrderScreen", {
                          category: a.name,
                        });
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        backgroundColor: a.color,
                        marginTop: 30,
                      }}
                    >
                      <Image
                        source={a.icon}
                        style={{
                          width: 50,
                          height: 50,
                          alignSelf: "center",
                          marginTop: 5,
                        }}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={{ alignSelf: "center", fontSize: 15 }}>
                        {a.name}
                      </Text>
                    </View>
                  </View> 
                );
              })}  
            </ScrollView>

            <Text style={{ marginTop: 10, marginLeft: 10, fontWeight: "bold", fontSize:18 }}>
              Recommended:
            </Text>

            <View>
              {this.state.products.length === 0 ? (
                <View style={{ alignSelf: "center", }}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 50,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    No Products found!
                  </Text>
                </View>
              ) : (
                this.state.products.map((a) => {
                  return (
                    <TouchableOpacity
                    key={a.id}
                      onPress={() => {
                        this.props.navigation.navigate("OrderDetails", {
                          id: a.id,
                        });
                      }}
                      style={{
                        backgroundColor: "#F8F8F8",
                        marginVertical: 10,
                        padding: 10,
                        borderRadius: 10,
                        width: "90%",
                        alignSelf: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={{ uri: a.image }}
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                      />
                      <View style={{ marginLeft: 20, width: "70%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {a.name}
                        </Text>
                        <Text
                          style={{ color: "grey", fontSize: 12, width: 140 }}
                          numberOfLines={1}
                        >
                          {a.description}
                        </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          ₹{a.price}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
