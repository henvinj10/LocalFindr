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
import SearchScreen from "./SearchScreen";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; // Correct import

const VendorProfileScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getTokenAndSetEmail = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
          setUserType(decoded.userType);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    getTokenAndSetEmail();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`http://10.4.6.44:8080/vendor/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching data");
      console.error(error);
    }
  };

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

  if (data) {
    return (
      <Animated.View
        key={"NEWKey"}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(400)}
        style={{ flex: 1, height: "100%" }}
      >
        <SearchScreen data={data} isFavorite={false} icon={false} />
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
            <Text style={{ marginTop: 10 }}>{userType}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <CustomButton label="Manage Inventory" handlePress={fetchData} />
          <CustomButton label="Logout" handlePress={handleLogout} />
        </View>
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
  name: {
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
    borderRadius: 75,
  },
  logout: {
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    alignContent: "center",
  },
  buttons: {
    paddingHorizontal: 20,
    alignContent: "center",
    marginVertical: 20,
  },
  productImage: {
    width: 50,
    height: 50,
    marginTop: 8,
  },
});

export default VendorProfileScreen;
