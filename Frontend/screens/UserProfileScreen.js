import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  BackHandler,
} from "react-native";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import SearchScreen from "./SearchScreen";
import "core-js/stable/atob";
import Toast from "react-native-toast-message";

const UserData = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setEmail(jwtDecode(token).email);
        } else {
          // Handle case where token is not available
          console.error("Token not found in AsyncStorage");
        }
      } catch (error) {
        // Handle AsyncStorage or jwtDecode errors
        console.error("Error retrieving or decoding token:", error);
      }
    }

    getToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        const onBackPress = () => {
          setData(null);
          return true; // Prevent default behavior (navigating back)
        };

        BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }
    }, [data])
  );

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.replace("Login");
    Toast.show({
      type: "success",
      text1: "Logout Successful",
      position: "bottom",
    });
  };

  const getWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // console.log(email);
      const url = `http://10.4.6.44:8080/customer/wishlist`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(jwtDecode(token).userType);
      const result = await response.json();
      setData(result);
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching data");
      console.error(error);
    }
  };

  if (data) {
    return (
      <Animated.View
        key={"NEWKey"}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(400)}
        style={{ flex: 1, height: "100%" }}
      >
        <SearchScreen data={data} isFavorite={true} icon={true} />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=681%2C454",
              }}
            />
            <Text style={{ marginTop: 10 }}>Customer</Text>
          </View>
        </View>
      </View>
      <View style={styles.logout}>
        <CustomButton label="Wishlist" handlePress={getWishlist} />
        <CustomButton label="Logout" handlePress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderColor: "#ccc",
    marginBottom: 30,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  profile: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    marginTop: 16,
    fontSize: 14,
    color: "gray",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  logout: {
    alignItems: "center",
    width: "100%",
  },
});

export default UserData;
