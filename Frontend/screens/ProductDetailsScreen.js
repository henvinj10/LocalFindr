import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode"; // Ensure jwt-decode is installed and imported
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

const ProductDetailsScreen = () => {
  const route = useRoute();
  const { item: product } = route.params;
  const [userType, setUserType] = useState(null);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");

  const updateAvailability = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setUserType(jwtDecode(token).userType);
      const updatedProduct = {
        ...product,
        available: !product.available, // Toggle availability
      };

      const response = await axios.put(
        "http://10.4.6.44:8080/vendor/update",
        {
          offeringID: updatedProduct.offeringID,
          name: updatedProduct.name,
          category: updatedProduct.category,
          price: updatedProduct.price,
          type: updatedProduct.type,
          description: updatedProduct.description,
          available: updatedProduct.available,
          availableTime: updatedProduct.availableTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Product availability updated successfully!");
        // Add the product to favorites upon successful update
        addFavorite(updatedProduct);
      } else {
        Alert.alert("Error", "Failed to update product availability");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while updating data");
      console.error(error);
    }
  };

  const addFavorite = async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const email = jwtDecode(token).email;
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
          Alert.alert("Product added to favorites successfully");
        } else {
          Alert.alert("Failed to add product to favorites");
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      Alert.alert("Error adding product to favorites:", error);
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    // Add logic for size selection if needed
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    // Add logic for color selection if needed
  };

  return (
    <ScrollView>
      <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${product.image}` }}
            style={styles.coverImage}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.fontText}>{product.name}</Text>
            <Text style={styles.fontText}>${product.price}</Text>
          </View>
          <View style={styles.attributeContainer}>
            <Text style={[styles.fontText, styles.attributeText]}>
              Category: {product.category}
            </Text>
            <Text style={[styles.fontText, styles.attributeText]}>
              Type: {product.type}
            </Text>
            <Text style={[styles.fontText, styles.attributeText]}>
              Description: {product.description}
            </Text>
            <Text style={[styles.fontText, styles.attributeText]}>
              Available: {product.available ? "Yes" : "No"}
            </Text>
            {product.availableTime && (
              <Text style={[styles.fontText, styles.attributeText]}>
                Available Time: {product.availableTime}
              </Text>
            )}
            {product.gmapLink && (
              <Pressable
                style={styles.map}
                onPress={() => Linking.openURL(product.gmapLink)}
              >
                <Text style={[styles.fontText, styles.attributeText]}>
                  Location:
                </Text>
                <EvilIcons
                  name="location"
                  size={20}
                  color="blue"
                  style={styles.icon}
                />
              </Pressable>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={updateAvailability}>
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 256,
    width: 256,
    borderRadius: 20,
    position: "relative",
    alignSelf: "center",
  },
  coverImage: {
    resizeMode: "cover",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444444",
  },
  attributeContainer: {
    marginTop: 20,
  },
  attributeText: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  map: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
