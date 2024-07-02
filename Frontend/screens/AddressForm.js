import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import TextInputField from "../components/TextInputField";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

const AddressForm = () => {
  const [buildingInfo, setBuildingInfo] = useState({ value: "", error: "" });
  const [streetName, setStreetName] = useState({ value: "", error: "" });
  const [localBody, setLocalBody] = useState({ value: "", error: "" });
  const [city, setCity] = useState({ value: "", error: "" });
  const [district, setDistrict] = useState({ value: "", error: "" });
  const [state, setState] = useState({ value: "", error: "" });
  const [country, setCountry] = useState({ value: "", error: "" });
  const [gMapLink, setGMapLink] = useState({ value: "", error: "" });

  const handleBuildingInfoChange = (text) =>
    setBuildingInfo({ ...buildingInfo, value: text });
  const handleStreetNameChange = (text) =>
    setStreetName({ ...streetName, value: text });
  const handleLocalBodyChange = (text) =>
    setLocalBody({ ...localBody, value: text });
  const handleCityChange = (text) => setCity({ ...city, value: text });
  const handleDistrictChange = (text) =>
    setDistrict({ ...district, value: text });
  const handleStateChange = (text) => setState({ ...state, value: text });
  const handleCountryChange = (text) => setCountry({ ...country, value: text });
  const handleGMapLinkChange = (text) =>
    setGMapLink({ ...gMapLink, value: text });

  const updateAddress = async () => {
    if (
      !buildingInfo.value &&
      !streetName.value &&
      !localBody.value &&
      !city.value &&
      !district.value &&
      !state.value &&
      !country.value &&
      !gMapLink.value
    ) {
      Alert.alert("Error", "Please fill at least one field");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        console.log(token);
        const response = await axios.put(
          `http://10.4.6.44:8080/user/update`,
          {
            buildingInfo: buildingInfo.value || null,
            streetName: streetName.value || null,
            localBody: localBody.value || null,
            city: city.value || null,
            district: district.value || null,
            state: state.value || null,
            Country: country.value || null,
            gmapLink: gMapLink.value || null,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        Toast.show({
          type: "success",
          text1: "Address updated successfully",
          position: "bottom",
        });
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      Toast.show({
        type: "error",
        text1: "Error updating address",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInputField
        label="Building Information"
        placeholder="Enter building info"
        value={buildingInfo.value}
        onChangeText={handleBuildingInfoChange}
        errorMessage={buildingInfo.error}
      />
      <TextInputField
        label="Street Name"
        placeholder="Enter street name"
        value={streetName.value}
        onChangeText={handleStreetNameChange}
        errorMessage={streetName.error}
      />
      <TextInputField
        label="Village or Municipality"
        placeholder="Enter village or municipality"
        value={localBody.value}
        onChangeText={handleLocalBodyChange}
        errorMessage={localBody.error}
      />
      <TextInputField
        label="City"
        placeholder="Enter city"
        value={city.value}
        onChangeText={handleCityChange}
        errorMessage={city.error}
      />
      <TextInputField
        label="District"
        placeholder="Enter district"
        value={district.value}
        onChangeText={handleDistrictChange}
        errorMessage={district.error}
      />
      <TextInputField
        label="State"
        placeholder="Enter state"
        value={state.value}
        onChangeText={handleStateChange}
        errorMessage={state.error}
      />
      <TextInputField
        label="Country"
        placeholder="Enter country"
        value={country.value}
        onChangeText={handleCountryChange}
        errorMessage={country.error}
      />
      <TextInputField
        label="Google Map Shop Location Link"
        placeholder="Enter Google Map link"
        value={gMapLink.value}
        onChangeText={handleGMapLinkChange}
        errorMessage={gMapLink.error}
      />
      <View style={styles.button}>
        <CustomButton label="Update Address" handlePress={updateAddress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default AddressForm;
