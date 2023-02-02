import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import React, { useState } from "react";

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show,setShow] = useState(false);
  const [visible,setVisible] = useState(false);
  const handleRegister = async () => {
    await fetch("http://10.0.2.2:8000/api/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (name === undefined) {
          ToastAndroid.show("Tên không được để trống", ToastAndroid.SHORT);
        } else if (email === undefined) {
          ToastAndroid.show("Email không được để trống", ToastAndroid.SHORT);
        } else if (password === undefined) {
          ToastAndroid.show("Password không được để trống", ToastAndroid.SHORT);
        } else if (name.length < 2) {
          ToastAndroid.show(
            "Tên không được ít hơn 2 kí tự",
            ToastAndroid.SHORT
          );
        } else if (name.length > 100) {
          ToastAndroid.show(
            "Tên không được nhiều hơn 100 kí tự",
            ToastAndroid.SHORT
          );
        } else if (password.length < 2) {
          ToastAndroid.show(
            "Password không được ít hơn 2 kí tự",
            ToastAndroid.SHORT
          );
        } else if (password.length > 25) {
          ToastAndroid.show(
            "Password không được nhiều hơn 25 kí tự",
            ToastAndroid.SHORT
          );
        } else if (resData.code === 500) {
          ToastAndroid.show(
            "Đăng kí tài khoản không thành công",
            ToastAndroid.SHORT
          );
        } else if (resData.code === 200) {
          ToastAndroid.show("Đăng kí tài khoản thành công", ToastAndroid.SHORT);
          navigation.navigate("Login");
        }
      });
  };
  return (
    <View style={{ backgroundColor: "#FFF", height: "100%" }}>
      <Image
        source={require("../images/boat1.png")}
        style={styles.image}
      />
      <Text style={styles.textTitle}>REGISTER</Text>
      <View style={styles.email}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 10 }}
          value={name}
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View style={styles.password}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 10 }}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={styles.password}>
        <TextInput
          secureTextEntry={visible}
          placeholder="Password"
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 10 }}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.eyeHidden} onPress={() =>{
          setVisible(!visible)
          setShow(!show)
        }}>
          <MaterialCommunityIcons 
            name={show === false ? 'eye-outline' : 'eye-off-outline'}
            size={23}
            color="#00716F"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.registerBtn}>
        <Text
          style={{
            color: "white",
          }}
          onPress={() => handleRegister()}
        >
          REGISTER
        </Text>
      </View>

      <View style={styles.backtoLoginBtn}>
        <Text
          style={{
            color: "white",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          BACK TO LOGIN
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "43%",
  },
  textTitle: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  email: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  registerBtn: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  backtoLoginBtn: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  eyeHidden:{
    paddingLeft:140
  }
});

export default Register;
