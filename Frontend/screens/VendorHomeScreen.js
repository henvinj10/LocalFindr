import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import colors from "../constants/Colors";
import CustomButton from "../components/Button";
import TextInputField from "../components/TextInputField";

const UploadProductScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !category || !price || !image) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", parseFloat(price));
    formData.append("image", {
      uri: image.uri,
      name: "product_image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "http://your-server-url.com/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        Alert.alert("Success", "Product uploaded successfully");
        setName("");
        setCategory("");
        setPrice("");
        setImage(null);
      } else {
        Alert.alert("Error", "Failed to upload product");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while uploading the product");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      </View>
      <Text style={styles.label}>Product Name</Text>
      <TextInputField value={name} onChangeText={setName} />
      {/* <TextInput style={styles.input} value={name} onChangeText={setName} /> */}
      <Text style={styles.label}>Category</Text>
      <TextInputField value={category} onChangeText={setCategory} />
      <Text style={styles.label}>Price</Text>
      <TextInputField
        value={price}
        onChangeText={setPrice}
        keyboardType={"numeric"}
      />
      <View style={styles.buttonContainer}>
        <CustomButton label="Select Image" handlePress={selectImage} />
        <CustomButton label="Upload" handlePress={handleSubmit} />
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: 250,
    height: 250,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },
});

export default UploadProductScreen;