import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { COLOURS, Items } from "../Database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductInfo = ({ route, navigation }) => {
  const { productID } = route.params;

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/products");
      const data = await response.json();
      const Items = data.product;
      console.log(Items);

      for (let index = 0; index < Items.length; index++) {
        if (Items[index].id == productID) {
          await setProduct(Items[index]);
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Thêm sản phẩm vào giỏ hàng thành công",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Thêm sản phẩm vào giỏ hàng thành công",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <View style={styles.btnCart}>
      <StatusBar backgroundColor={COLOURS.backgroundLight} />
      <ScrollView>
        <View style={styles.main2}>
          <View style={styles.main3}>
            <TouchableOpacity onPress={() => navigation.goBack("Home")}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <View style={styles.images}>
              <Image
                source={{uri : "http://10.0.2.2:8080" + product.image}}
                style={{
                  width: 250,
                  height: 250,
                }}
              />
            </View>
            
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.iconCart}>
            <Entypo name="shopping-cart" style={styles.textCart} />
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
              }}
            >
              Product Detail
            </Text>
          </View>
          <View>
            <Text style={styles.productName}>{product.name}</Text>
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text style={styles.productPrice}>Price: {product.price}$</Text>
            <Text>
              Sale: {product.offPercentage ? product.offPercentage : "not sale"}
              %
            </Text>
          </View>
          <View style={styles.manufacturer}>
            <Text style={styles.textManufacturer}>
              Manufactor : {product.manufactuner}
            </Text>
            <Text style={styles.productStatus}>Status : {product.status}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.main4}>
      <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {product.isAvailable ? 'Add to cart' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  images:{
    marginRight:20,
    width: "75%",
    height: "100%",
    resizeMode: "contain",
    position:'relative',
  },
  btnCart: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.white,
    position: "relative",
  },
  main: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  iconCart: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  textCart: {
    fontSize: 18,
    color: COLOURS.blue,
    marginRight: 6,
  },
  productName: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginVertical: 4,
    color: COLOURS.black,
    maxWidth: "84%",
  },
  productDescription: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: "400",
    letterSpacing: 1,
    opacity: 0.5,
    lineHeight: 20,
    maxWidth: "85%",
    maxHeight: 44,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLOURS.backgroundLight,
    borderBottomWidth: 1,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "500",
    maxWidth: "85%",
    color: COLOURS.black,
    marginTop: 20,
  },
  manufacturer: {
    marginLeft: 14,
    marginTop: 10,
  },
  textManufacturer: {
    fontSize: 16,
    color: "grey",
  },
  productStatus: {
    paddingTop: 20,
    fontSize: 18,
    color: "green",
  },
  productTotalPrice: {
    marginLeft: 14,
    paddingTop: 10,
  },
  productTotalPriceText: {
    fontSize: 16,
  },
  imgMain: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  main2: {
    width: "100%",
    backgroundColor: COLOURS.backgroundLight,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  main3: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingLeft: 16,
  },
  main4: {
    position: "absolute",
    bottom: 10,
    height: "8%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCart1: {
    width: "86%",
    height: "90%",
    backgroundColor: COLOURS.blue,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCart2: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
    color: COLOURS.white,
    textTransform: "uppercase",
  },
});

export default ProductInfo;
