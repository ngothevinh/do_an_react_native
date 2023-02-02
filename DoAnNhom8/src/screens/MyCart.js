import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { COLOURS, Items } from "../Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    const response = await fetch("http://10.0.2.2:8000/api/products");
    const data = await response.json();
    const Items = data.product;
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
      getSale(productData);
    } else {
      setProduct(false);
      getTotal(false);
      getSale(false);
    }
  };

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
       total = productData[index].price;
    }
    setTotal(total);
  };
  const getSale = (productData) => {
    let sale = 0;
    for (let index = 0; index < productData.length; index++) {
      sale = productData[index].offPercentage;
    }
    setSale(sale);
  };

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }

    ToastAndroid.show("Thanh toán sản phẩm thành công", ToastAndroid.SHORT);

    navigation.navigate("Home");
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.key}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
        style={styles.nav}
      >
        <View style={styles.nav1}>
          <Image source={{uri : "http://10.0.2.2:8080" + data.image}} style={styles.image} />
        </View>
        <View style={styles.text1}>
          <View style={{}}>
            <Text style={styles.text2}>{data.name}</Text>
            <View style={styles.text3}>
              <Text style={styles.text4}>{data.price}$</Text>
            </View>
          </View>
          <View style={styles.icon1}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={styles.iconDown}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View style={styles.iconUp}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={styles.iconDelete}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <ScrollView>
        <View style={styles.main}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.text}>Order Details</Text>
          <View></View>
        </View>
        <Text style={styles.cartText}>My Cart</Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          ></View>

          <View style={styles.cartOrder}>
            <Text style={styles.textCartOrder}>Order Info</Text>
            <View style={styles.cartTotal}>
              <Text style={styles.textSubtotal}>Tổng tiền</Text>
              <Text style={styles.textPrice}>{total}$</Text>
            </View>
            <View style={styles.textSale}>
              <Text style={styles.priceSale}>Giảm giá</Text>
              <Text style={styles.priceSale1}>{sale}%</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.total1}>Tổng tiền sau khi giảm giá</Text>
              <Text style={styles.total2}>{total * (1 - sale/100)}$</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => (total != 0 ? checkOut() : null)}
        >
          <Text style={styles.btn2}>
            CHECKOUT:
            {total * (1 - sale/100)}$
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    fontSize: 20,
    color: COLOURS.red,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    color: COLOURS.red,
    fontWeight: "400",
  },
  cartText: {
    fontSize: 24,
    color: COLOURS.black,
    fontWeight: "500",
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
  },
  cartOrder: {
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 80,
  },
  textCartOrder: {
    fontSize: 16,
    color: COLOURS.black,
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: 20,
  },
  cartTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  textSubtotal: {
    fontSize: 12,
    fontWeight: "400",
    maxWidth: "80%",
    color: COLOURS.black,
    opacity: 0.5,
  },
  textPrice: {
    fontSize: 12,
    fontWeight: "400",
    color: COLOURS.black,
    opacity: 0.8,
  },
  textSale: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  priceSale: {
    fontSize: 12,
    fontWeight: "400",
    maxWidth: "80%",
    color: COLOURS.black,
    opacity: 0.5,
  },
  priceSale1: {
    fontSize: 12,
    fontWeight: "400",
    color: COLOURS.black,
    opacity: 0.8,
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total1: {
    fontSize: 12,
    fontWeight: "400",
    maxWidth: "80%",
    color: COLOURS.black,
    opacity: 0.5,
  },
  total2: {
    fontSize: 18,
    fontWeight: "500",
    color: COLOURS.black,
  },
  nav: {
    width: "100%",
    height: 100,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  nav1: {
    width: "40%",
    height: 100,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.green,
    borderRadius: 10,
    marginRight: 22,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text1: {
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
  },
  text2: {
    fontSize: 15,
    maxWidth: "100%",
    color: COLOURS.black,
    fontWeight: "600",
    letterSpacing: 1,
  },
  text3: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.5,
  },
  text4: {
    fontSize: 15,
    fontWeight: "400",
    maxWidth: "85%",
    marginRight: 4,
  },
  icon1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconDown: {
    borderRadius: 100,
    marginRight: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: COLOURS.backgroundMedium,
    opacity: 0.5,
  },
  iconUp: {
    borderRadius: 100,
    marginLeft: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: COLOURS.backgroundMedium,
    opacity: 0.5,
  },
  iconDelete: {
    fontSize: 16,
    color: COLOURS.backgroundDark,
    backgroundColor: COLOURS.backgroundLight,
    padding: 8,
    borderRadius: 100,
  },
  btn: {
    position: "absolute",
    bottom: 10,
    height: "8%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn1: {
    width: "86%",
    height: "90%",
    backgroundColor: COLOURS.blue,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
    color: COLOURS.white,
    textTransform: "uppercase",
  },
});
