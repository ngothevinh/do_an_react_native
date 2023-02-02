import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import {MaterialCommunityIcons} from "@expo/vector-icons"

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show,setShow] = useState(false);
  const [visible,setVisible] = useState(true);

  const handleLogin = async () => {
    await fetch("http://10.0.2.2:8000/api/login", {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (email === undefined) {
          ToastAndroid.show("Email không được để trống", ToastAndroid.SHORT);
        } else if (password === undefined) {
          ToastAndroid.show("Password không được để trống", ToastAndroid.SHORT);
        } else if (resData.code === 500) {
          ToastAndroid.show(
            "Email hoặc mật khẩu không chính xác",
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show(
            "Đăng nhập thành công",
            ToastAndroid.SHORT
          );
          navigation.navigate("Home");
        }
      });
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <Image
        source={require("../images/boat1.png")}
        style={styles.image}
      />
      <Text style={styles.textLogin}>LOGIN</Text>
      <View style={styles.email}>
        <Icon color="#00716F" size={24}></Icon>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#00716F"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={styles.password}>
        <Icon color="#00716F" size={24}></Icon>
        <TextInput
          secureTextEntry={visible}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#00716F"
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

      <View style={styles.btn_login}>
        <Text
          style={{
            color: "white",
          }}
          onPress={() => handleLogin()}
        >
          LOGIN
        </Text>
      </View>
      <View style={styles.btn_register}>
        <Text
          style={{
            color: "white",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    with: "100%",
    height: "40%",
  },
  textLogin: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  email: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 50,
    borderColor: "#00716f",
    borderRadius: 23,
  },
  input: {
    paddingHorizontal: 10,
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 20,
    borderColor: "#00716f",
    borderRadius: 23,
  },
  btn_login: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  btn_register: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  eyeHidden:{
    paddingLeft:140
  }
});
export default Login;
