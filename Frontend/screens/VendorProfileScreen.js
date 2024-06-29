import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchScreen from "./SearchScreen";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const VendorProfileScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.replace("Login");
    // product.color = selectedColor;
    // product.size = selectedSize;
    // // Add the product to the cart logic here
    // navigation.navigate("CART");
  };
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = `http://10.4.6.44:8080/vendor/all`;

      const response = await fetch(`http://10.4.6.44:8080/vendor/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setData(result);
      // console.log(result);
      // setData(result);
      // navigation.navigate("InventoryDetails", { data });
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
        <SearchScreen data={data} isfavorite={false} icon={false} />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.name}>Stevens</Text>
            <Text style={styles.email}>johnstevens@email.com</Text>
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
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <CustomButton
            label="Manage Inventory"
            handlePress={fetchData}
          />
          <CustomButton
            label="Logout"
            handlePress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    // justifyContent: "space-around",
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
    borderRadius: 50,
  },
  logout: {
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    // width: Dimensions.get("screen").width * 0.5,
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