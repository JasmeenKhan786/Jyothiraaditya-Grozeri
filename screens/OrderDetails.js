import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { Entypo } from "@expo/vector-icons";
// onPress={()=>{
//   this.props.navigation.navigate('OrderDetails',{id:a.id})
// }}

// var resp= db.collection('Products').doc(this.props.route.params.id).get();
//resp.data() - state
export default class OrderDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      products: [],
      value: 0,
      message: "",
      deliveryOption: "",
      address: "",
    };
  }

  addRequest = () => {
    this.setState({modalVisible:false})
    db.collection("requests").add({
      customerMessage: this.state.message,
      customerQuantity: this.state.value,
      customerEmail: firebase.auth().currentUser.email,
      customerAddress: this.state.address,
      deliveryOption: this.state.deliveryOption,
      productId: this.props.route.params.id,
      productName: this.state.products.name,
      productPrice: this.state.products.price,
      productImage: this.state.products.image,
      sellerEmail: this.state.products.email,
      productDescription: this.state.products.description,
      productCategory: this.state.products.category,
      quantity: this.state.products.quantity,
      status: "Pending",
    });
    alert('Request Sent!')
  };
  getProducts = async () => {
    var resp = await db
      .collection("Products")
      .doc(this.props.route.params.id)
      .get();


    this.setState({ products: resp.data() });
  };
  getProfile = async () => {
    var temp = await db
      .collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();

    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
        address: obj.address,
      });
    });
  };
  componentDidMount() {
    this.getProducts();
    this.getProfile();
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
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
            <Text style={{ color: "black", fontSize: 20 }}>Order</Text>
            <View style={{ backgroundColor: "#eb8430" }}></View>
          </View>

          <View style={{ marginTop: 10, fontWeight: "bold" }}>
            <Text
              style={{ fontWeight: "bold", alignSelf: "center", fontSize: 24 }}
            >
              {this.state.products.name}
            </Text>
            <Text style={{ alignSelf: "center", color: "grey" }}>
              {this.state.products.category}
            </Text>
            <Image
              style={{
                width: "60%",
                height: 210,
                alignSelf: "center",
                borderRadius: 10,
                marginTop: 10,
              }}
              source={{ uri: this.state.products.image }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Product Description
            </Text>

            <Text style={{ color: "grey", fontSize: 17, marginLeft: 20 }}>
              {this.state.products.description}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Price/Quantity
            </Text>
            <Text style={{ fontSize: 18, marginLeft: 20, color: "grey" }}>
              ₹{this.state.products.price}/{this.state.products.quantity}
            </Text>

            <Text style={{ fontSize: 18, marginLeft: 20, color: "grey" }}>
              {this.state.sellerAddress}
            </Text>
          </View>

          <View
            style={{
              marginTop: "5%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ value: this.state.value + 1 });
              }}
              style={{
                backgroundColor: "#EB8430",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                elevation: 10,
                shadowColor: "black",
                shadowOffset: { width: 0.5, height: 1 },
                shadowOpacity: 0.5,
              }}
            >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "white",
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                elevation: 10,
                shadowColor: "black",
                shadowOffset: { width: 0.5, height: 1 },
                shadowOpacity: 0.5,
              }}
            >
              <Text style={{ fontSize: 20 }}>{this.state.value}</Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.value !== 0) {
                    this.setState({ value: this.state.value - 1 });
                  }
                }}
                style={{
                  backgroundColor: "#EB8430",
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  elevation: 10,
                  shadowColor: "black",
                  shadowOffset: { width: 0.5, height: 1 },
                  shadowOpacity: 0.5,
                }}
              >
                <AntDesign name="minus" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#EB8430",
                padding: 5,
                borderRadius: 10,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                if(this.state.value >0){
                this.setState({ modalVisible: true, deliveryOption:'', address:'',message:'' });
                }
                else{
                  alert('Please choose a quantity!')
                }
              }}
            >
              <Text style={{ color: "white" }}>+ Your Information</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "80%",
                  marginTop: 280,

                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>

                <Text
                  style={{ marginLeft: 20, fontWeight: "bold", fontSize: 18 }}
                >
                  Address:
                </Text>
                <TextInput
                  onChangeText={(val) => {
                    this.setState({ address: val });
                  }}
                  style={{
                    width: "90%",
                    height: 40,
                    alignSelf: "center",
                    marginTop: 10,
                    borderWidth: 1,
                    padding: 10,
                    color: "grey",
                  }}
                  placeholder="50, Juhu Rd"
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 20,
                  }}
                >
                  Delivery Option:
                </Text>
                <TextInput
                  onChangeText={(val) => {
                    this.setState({ deliveryOption: val });
                  }}
                  style={{
                    width: "90%",
                    height: 40,
                    alignSelf: "center",
                    marginTop: 10,
                    borderWidth: 1,
                    padding: 10,
                    color: "grey",
                  }}
                  placeholder="Pickup or Delivery "
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 20,
                  }}
                >
                  Message:
                </Text>
                <TextInput
                  onChangeText={(val) => {
                    this.setState({ message: val });
                  }}
                  style={{
                    width: "90%",
                    height: 40,
                    alignSelf: "center",
                    marginTop: 10,
                    borderWidth: 1,
                    paddingLeft: 10,
                  }}
                  placeholder="Any Messages for the seller"
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "#EB8430",
                    width: "60%",
                    height: 30,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius:10, marginTop:30
                  }}
                  onPress={() => {
                    if(this.state.deliveryOption && this.state.address){
                    this.addRequest();
                    }
                    else{
                      alert('Please fill all the details!')
                    }
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Send Request
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
