import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  BackHandler,
  Linking,
  Pressable,
} from "react-native";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchScreen from "./SearchScreen";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode"; // Updated import for jwtDecode
import "core-js/stable/atob";
import AddressForm from "./AddressForm";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const VendorProfileScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [address, setAddress] = useState(null);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
          setUserType(decoded.userType);
          const url = `http://10.4.6.44:8080/user/profile`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          setAddress(result.address);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    getDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
    Toast.show({
      type: "success",
      text1: "Logout Successful",
      position: "bottom",
    });
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
      console.log(result[0].available);
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching data");
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (data || isAddressFormVisible) {
        const onBackPress = () => {
          setData(null);
          setIsAddressFormVisible(false);
          console.log(isAddressFormVisible); // Log current visibility for debugging
          return true; // Prevent default behavior (navigating back)
        };

        BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }
    }, [data, isAddressFormVisible])
  );

  if (isAddressFormVisible === true) {
    return (
      <Animated.View
        key={"NEWKey"}
        entering={FadeIn.duration(100)}
        exiting={FadeOut.duration(100)}
        style={{ flex: 1, height: "100%" }}
      >
        <AddressForm />
      </Animated.View>
    );
  }

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
        {address && (
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              Building: {address.buildingInfo}
            </Text>
            <Text style={styles.addressText}>Street: {address.streetName}</Text>
            <Text style={styles.addressText}>
              Local Body: {address.localBody}
            </Text>
            <Text style={styles.addressText}>District: {address.district}</Text>
            <Text style={styles.addressText}>City: {address.city}</Text>
            <Text style={styles.addressText}>State: {address.state}</Text>
            <Text style={styles.addressText}>Country: {address.country}</Text>
            <Text style={styles.addressText}>
              Google Maps:{" "}
              <Pressable onPress={() => Linking.openURL(address.gmapLink)}>
                <Feather name="map-pin" size={20} color="blue" />
              </Pressable>
              {/* <Text
                style={styles.link}
                onPress={() => Linking.openURL(address.gmapLink)}
              >
                {address.gmapLink}
              </Text> */}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <CustomButton label="Manage Inventory" handlePress={fetchData} />
          <CustomButton
            label="Update Address"
            handlePress={() => setIsAddressFormVisible(true)}
          />
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
  email: {
    marginTop: 16,
    fontSize: 14,
    color: "gray",
  },
  addressContainer: {
    marginTop: 16,
  },
  addressText: {
    fontSize: 14,
    color: "gray",
  },
  link: {
    color: "blue",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
});

export default VendorProfileScreen;
