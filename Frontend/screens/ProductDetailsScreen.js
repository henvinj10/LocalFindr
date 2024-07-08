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
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import UploadProductScreen from "./VendorHomeScreen";

const ProductDetailsScreen = () => {
  const route = useRoute();
  const { item: product } = route.params;
  const [userType, setUserType] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setUserType(jwtDecode(token).userType);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };
    fetchUserType();
  }, []);

  const editOffering = () => {
    setUpdate(product);
    console.log(update);
  };

  const updateAvailability = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

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
      } else {
        Alert.alert("Error", "Failed to update product availability");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while updating data");
      console.error(error);
    }
  };

  const toggleFavorite = (item) => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  const addFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `http://10.4.6.44:8080/customer/save/${product.offeringID}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Product added to wishlist successfully");
        setIsFavorite(true);
      } else {
        Alert.alert("Failed to add product to favorites");
      }
    } catch (error) {
      Alert.alert("Error adding product to favorites:", error.message);
      console.error(error);
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
          Alert.alert("Product deleted from wishlist");
          setIsFavorite(false);
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

  if (update) {
    return <UploadProductScreen update={update} />;
  }

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
            <Text style={styles.fontText}>₹{product.price}</Text>
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
            {product.address && (
              <Pressable
                style={styles.map}
                onPress={() => Linking.openURL(product.address.gmapLink)}
              >
                <Text style={[styles.fontText, styles.attributeText]}>
                  Location:
                </Text>
                <Feather
                  name="map-pin"
                  size={20}
                  color="blue"
                  style={styles.icon}
                />
              </Pressable>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={
              userType === "CUSTOMER"
                ? () => toggleFavorite(product)
                : editOffering
            }
          >
            <Text style={styles.buttonText}>
              {userType === "CUSTOMER"
                ? isFavorite
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
                : "Edit Product Details "}
            </Text>
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
  imageContainer: {
    height: 256,
    width: 256,
    borderRadius: 20,
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
  icon: {
    marginLeft: 5,
  },
});
