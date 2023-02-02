import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { COLOURS, Items } from "../Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState({});
  const [keyword, setKeyword] = useState("");

  const getData = async () => {
    try {
      const { data } = await axios.get("http://10.0.2.2:8000/api/products");
      return data;
    } catch (err) {
      console.log(err);
    }
    throw err;
  };
  useEffect(() => {
    getData().then((data) => {
      setProducts(data.product);
    });
  }, []);

  const onSearch = async () => {
    if (keyword.trim() === "") {
      const { data } = await axios.get("http://10.0.2.2:8000/api/products");
      setProducts(data.product);
    } else {
      const { data } = await axios.get(
        `http://10.0.2.2:8000/api/products/search/${keyword}`
      );
      setProducts(data);
    }
  };

  const ProductCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: item.id })
        }
      >
        <View style={styles.container}>
          <View style={styles.images}>
            <Image
              source={{ uri: "http://10.0.2.2:8080" + item.image }}
              style={{
                width: 100,
                height: 100,
                marginLeft: 27,
                marginTop: 7,
              }}
            />
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Price: {item.price} $</Text>
            <Text style={styles.manufactuner}>
              Manufactuner :{item.manufactuner}
            </Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo name="shopping-bag" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
            <MaterialCommunityIcons name="cart" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchText}
            placeholder="Enter your search"
            onChangeText={setKeyword}
            value={keyword}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.search1}
          onPress={onSearch}
          activeOpacity={0.7}
        >
          <Text style={styles.search2}>Tìm kiếm</Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 10, padding: 16 }}>
          <Text style={styles.textContent}>Danh sách sản phẩm</Text>
        </View>
        <FlatList data={products} renderItem={ProductCard} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  search1: {
    width: 110,
    height: 35,
    backgroundColor: "#00AC76",
    position: "absolute",
    right: 10,
    top: 90,
  },
  search2: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
  },
  images: {
    marginRight: 20,
    width: "40%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#00AC76",
    position: "relative",
    borderRadius: 20,
  },
  dataItem: {
    width: "100%",
    paddingRight: 100,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerIcon: {
    fontSize: 20,
    color: COLOURS.red,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F0F0F3",
  },
  textContent: {
    fontSize: 30,
    color: "#C04345",
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center",
  },
  search: {
    height: 60,
    marginTop: 10,
    marginHorizontal: 10,
  },
  searchText: {
    color: "black",
    height: 40,
    backgroundColor: "#777777",
    paddingLeft: 10,
    width: 250,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: "#00AC76",
  },
  manufactuner: {
    marginTop: 5,
    fontSize: 14,
    opacity: 0.5,
  },
  status: {
    fontSize: 16,
  },
});
export default Home;
