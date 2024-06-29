import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");
  console.log(product);
  const updateAvailability = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
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
          console.log('Product added to favorites successfully');
        } else {
          console.error('Failed to add product to favorites');
        }
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error adding product to favorites:', error);
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
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.imageContainer}>
          {/* Replace with your image component */}
          <Image source={{ uri: `data:image/png;base64,${product.image}` }} style={styles.coverImage} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.fontText}>{product.name}</Text>
            <Text style={styles.fontText}>${product.price}</Text>
          </View>
          <View style={styles.attributeContainer}>
            <Text style={[styles.fontText, styles.attributeText]}>Category: {product.category}</Text>
            <Text style={[styles.fontText, styles.attributeText]}>Type: {product.type}</Text>
            <Text style={[styles.fontText, styles.attributeText]}>Description: {product.description}</Text>
            <Text style={[styles.fontText, styles.attributeText]}>Available: {product.available ? 'Yes' : 'No'}</Text>
            {product.availableTime && (
              <Text style={[styles.fontText, styles.attributeText]}>Available Time: {product.availableTime}</Text>
            )}
            {product.gmapLink && (
              <Text style={[styles.fontText, styles.attributeText]}>Available Time: {product.gmapLink}</Text>
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
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 420,
    width: "100%",
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
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontWeight: "700",
  },
  selectedSize: {
    borderColor: "#E55B5B",
    borderWidth: 2,
  },
  colorContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  selectedColor: {
    borderColor: "#E55B5B",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
