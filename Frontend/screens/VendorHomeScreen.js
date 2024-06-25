import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const UploadProductScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      <Text style={styles.label}>Product Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Image</Text>
      <View style={styles.imageContainer}>
        <Button title="Pick an image from camera roll" onPress={selectImage} />
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      </View>
      <Button title="Upload Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
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
});

export default UploadProductScreen;
