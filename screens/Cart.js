import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// onPress={()=>{
//   this.props.navigation.navigate('OrderDetails',{id:a.id})
// }}

// var resp= db.collection('Products').doc(this.props.route.params.id).get();
//resp.data() - state
export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  getrequests = async () => {
    this.setState({ products: [] });
    var resp = await db
      .collection("requests")
      .where("customerEmail", "==", firebase.auth().currentUser.email)
      .get();

    resp.docs.map((d) => {
      var temp = this.state.products;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ products: temp });
    });
  };

  deleterequests = (id) => {
    db.collection("requests")
      .doc(id)
      .delete()
      .then(() => {
        alert("Order successfully cancelled!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
    this.getrequests();
  };

  componentDidMount() {
    this.getrequests();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{}}>
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
                this.props.navigation.goBack();
              }}
              name="arrow-bold-left"
              size={28}
              color="black"
            />
            <Text style={{ color: "black", fontSize: 20 }}>Cart</Text>
            <View style={{ backgroundColor: "#eb8430" }}></View>
          </View>

          {this.state.products.length === 0 ? (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  marginTop: "30%",
                  marginHorizontal: "5%", 
                }}
              >
                You have placed no orders yet!
              </Text>
            </View>
          ) : (
            this.state.products.map((a) => {
              return (
                <View
                key={a.id}
                  style={{
                    backgroundColor: "#F8F8F8",
                    marginVertical: 5,
                    padding: 10,
                    borderRadius: 20,
                    width: "90%",
                    alignSelf: "center",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{ uri: a.productImage }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 20,
                      marginTop: 30,
                      marginLeft: 10,
                    }}
                  />
                  <View style={{ marginLeft: 10, width: "70%", marginTop: 20 }}>
                    <Text style={{ fontSize: 14, color: "grey" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 17,
                          color: "black",
                        }}
                      >
                        Product
                      </Text>
                      {" " + a.productName}
                    </Text>
                    <Text style={{ fontSize: 14, color: "grey" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        Price
                      </Text>
                      ₹{" " + a.productPrice}
                    </Text>
                    <Text style={{ fontSize: 14, color: "grey" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        Quantity
                      </Text>
                      {" " + a.customerQuantity}
                    </Text>
                    <Text style={{ fontSize: 14, color: "grey" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        Address
                      </Text>
                      {" " + a.customerAddress}
                    </Text>

                    <Text style={{ fontSize: 14, color: "grey" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        Status
                      </Text>
                      {" " + a.status}
                    </Text>
                    <TouchableOpacity
                      style={{ marginLeft: 150, marginTop: 20 }}
                      onPress={() => {
                        this.deleterequests(a.id);
                      }}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
