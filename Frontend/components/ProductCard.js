import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import CustomButton from "./Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCard = ({ item, isFavorite, icon }) => {
  const [availability, setAvailability] = useState(item.available);
  const navigation = useNavigation();
  // console.log("Item:", item);

  useEffect(() => {
    setAvailability(item.available);
  }, [item.available]);

  const handleProductClick = (item) => {
    console.log(`${item.available} ${isFavorite}`);
    navigation.navigate("ProductDetails", { item });
  };

  const toggleFavorite = (item) => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  const addFavorite = async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.post(
          `http://10.4.6.44:8080/customer/save/${item.offeringID}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Favorite status toggled successfully");
        } else {
          console.error("Failed to toggle favorite status");
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const removeFavorite = async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.delete(
          `http://10.4.6.44:8080/customer/delete/${item.offeringID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Favorite status toggled successfully");
        } else {
          console.error("Failed to toggle favorite status");
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handlePressAvailable = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const updatedItem = {
        ...item,
        available: !availability, // Toggle the availability
      };

      const response = await axios.put(
        `http://10.4.6.44:8080/vendor/update`,
        {
          offeringID: updatedItem.offeringID,
          name: updatedItem.name,
          category: updatedItem.category,
          price: updatedItem.price,
          type: updatedItem.type,
          description: updatedItem.description,
          available: updatedItem.available,
          availableTime: updatedItem.availableTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAvailability(updatedItem.available);
        Alert.alert("Success", "Product availability updated successfully");
      } else {
        Alert.alert("Error", "Failed to update product availability");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while updating data");
      console.error(error);
    }
  };

  const handlePressNotAvailable = () => {
    // Logic when item is not available
    console.log(isFavorite)
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleProductClick(item)}
    >
      <Image
        source={{ uri: `data:image/png;base64,${item.image}` }}
        style={styles.coverImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
      {icon && (
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <EvilIcons
              name="heart"
              size={20}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      )}
      <CustomButton
        label={
          availability
            ? isFavorite
              ? "Available"
              : "Make Unavailable"
            : isFavorite
              ? "Unavailable"
              : "Make Available"
        }
        handlePress={
          icon === false ? handlePressAvailable : handlePressNotAvailable
        }
        color={availability ? "green" : "red"}
      />
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  coverImage: {
    height: 256,
    width: "100%",
    borderRadius: 20,
    position: "relative",
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444444",
  },
  price: {
    fontSize: 18,
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  favorite: {
    height: 20,
    width: 20,
  },
});
