import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
// import colors from "../constants/Colors";
import CustomButton from "../components/Button";
import TextInputField from "../components/TextInputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNFS from 'react-native-fs';

const UploadProductScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      // RNFS.readFile(result.assets[0].uri, 'base64').then((res) => {
      //   console.log(res)
      // })
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !category || !price || !image) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }
    console.log(base64Image)

    try {
      const token = await AsyncStorage.getItem("token");
      // console.log(token)
      const response = await axios.post(
        "http://10.4.6.44:8080/vendor/create",
        {
          name: name,
          category: category,
          price: 5456,
          type: "PRODUCT",
          description: "Lorwersjef",
          available: true,
          availableTime: "Monday",
          image: base64Image,
          // {
          //   // uri: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=681%2C454",
          //   // name: "product_image.jpg",
          //   // type: "image/jpeg",
          // }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
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
    marginTop: 50,
  },
});

export default UploadProductScreen;