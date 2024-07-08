import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/Button";
import TextInputField from "../components/TextInputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native-gesture-handler";

const UploadProductScreen = ({ update }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [selectedSection, setSelectedSection] = useState({ value: "" });

  const sections = [
    { key: "1", value: "PRODUCT" },
    { key: "2", value: "SERVICE" },
    { key: "3", value: "ALL" },
  ];
  const handleSectionSelect = (val) => {
    setSelectedSection({ value: val });
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
      console.log(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !category || !price || !image) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        "http://10.4.6.44:8080/vendor/create",
        {
          name: name,
          category: category,
          price: parseFloat(price), // Ensure price is sent as a number
          type: selectedSection.value,
          description: description || null,
          available: true,
          availableTime: availableTime || null,
          image: base64Image, // Send base64 image
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Product uploaded successfully");
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setAvailableTime("");

        setImage(null);
      } else {
        Alert.alert("Error", "Failed to upload product");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while uploading the product");
    }
  };

  const updateOffering = async () => {
    if (
      !name &&
      !category &&
      !price &&
      !selectedSection.value &&
      !description &&
      !availableTime &&
      !base64Image
    ) {
      Alert.alert("Validation Error", "Please fill at least one field");
      return;
    } else {
      try {
        const token = await AsyncStorage.getItem("token");
        // const updatedItem = {
        //   ...item,
        //   available: !isAvailable, // Toggle the availability
        // };
        const response = await axios.put(
          `http://10.4.6.44:8080/vendor/update`,
          {
            offeringID: update.offeringID,
            name: name || null,
            category: category || null,
            price: parseFloat(price) || null, // Ensure price is sent as a number
            type: selectedSection.value || null,
            description: description || null,
            available: true,
            availableTime: availableTime || null,
            image: base64Image, // Send base64 image
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          Alert.alert("Success", "Offering updated successfully");
        } else {
          Alert.alert("Error", "Failed to update offering");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong while updating data");
        console.error(error);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          {update ? "Update Offering" : " Add Offering"}
        </Text>
        <View style={styles.imageContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}
        </View>
        <Text style={styles.label}>Offering Name</Text>
        <TextInputField value={name} onChangeText={setName} />
        <Text style={styles.label}>Category</Text>
        <TextInputField value={category} onChangeText={setCategory} />
        <Text style={styles.label}>Price</Text>
        <TextInputField
          value={price}
          onChangeText={setPrice}
          keyboardType={"numeric"}
        />
        <Text style={styles.label}>Description</Text>
        <TextInputField value={description} onChangeText={setDescription} />
        {selectedSection.value === "SERVICE" && (
          <>
            <Text style={styles.label}>Available Time</Text>
            <TextInputField
              value={availableTime}
              onChangeText={setAvailableTime}
            />
          </>
        )}
        <View style={styles.searchBar}>
          <SelectList
            setSelected={handleSectionSelect}
            data={sections}
            save="value"
            placeholder="Choose a section"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label="Select Image" handlePress={selectImage} />
          <CustomButton
            label={update ? "Update" : "Upload"}
            handlePress={update ? updateOffering : handleSubmit}
          />
        </View>
        <View />
      </View>
    </ScrollView>
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
    marginTop: 30,
    marginBottom: 50,
  },
  searchBar: {
    marginBottom: 30,
  },
});

export default UploadProductScreen;
