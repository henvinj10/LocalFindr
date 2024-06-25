import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import colors from "../constants/Colors";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const delayNavigation = setTimeout(() => {
      navigation.replace("UserHomeTabs");
    }, 2000); // 2 seconds delay

    // Cleanup the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(delayNavigation);
  }, [navigation]);
  //   const fetchToken = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     setTimeout(() => {
  //       if (token === null) {
  //         navigation.replace('Login');
  //       } else {
  //         navigation.replace('Main');
  //       }
  //     }, 2000);
  //   };
  //   fetchToken();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
        size="large"
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
  },
  logo: {
    height: 250,
    width: 250,
  },
});

export default SplashScreen;
