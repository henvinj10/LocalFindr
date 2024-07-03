import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    fetchToken();
  }, [navigation]);
  const fetchToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setTimeout(() => {
      if (token === null) {
        navigation.replace("Login");
      } else {
        if (jwtDecode(token).userType === "CUSTOMER") {
          navigation.replace("UserHomeTabs");
        } else {
          navigation.replace("VendorHomeTabs");
        }
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        size="large"
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    padding: 20,
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
  },
});

export default SplashScreen;
