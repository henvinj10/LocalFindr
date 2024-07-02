import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SelectList } from "react-native-dropdown-select-list";
import colors from "../constants/Colors";
import TextInputField from "../components/TextInputField";
import { isEmpty } from "../utils/Validations";
import SearchScreen from "./SearchScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const UserHomeScreen = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState({ value: "ALL" });
  const [search, setSearch] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [localBody, setLocalBody] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [city, setCity] = useState({ value: "", valid: false, error: null });
  const [street, setStreet] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [price, setPrice] = useState({
    value: null,
    valid: false,
    error: null,
  });
  const [category, setCategory] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [data, setData] = useState(null);

  const sections = [
    { key: "1", value: "PRODUCT" },
    { key: "2", value: "SERVICE" },
    { key: "3", value: "ALL" },
  ];

  useFocusEffect(
    useCallback(() => {
      if (data) {
        const onBackPress = () => {
          setData(null);
          return true; // Prevent default behavior (navigating back)
        };

        BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }
    }, [data])
  );

  const handleSectionSelect = (val) => {
    setSelectedSection({ value: val });
  };

  const handleInputChange = (setter) => (text) => {
    if (isEmpty(text)) {
      setter({
        value: text,
        valid: false,
        error: "Please enter a valid input",
      });
      return;
    }
    setter({ value: text, valid: true, error: null });
  };

  const fetchResults = () => {
    if (selectedSection.value && search.valid) {
      fetchData();
    } else {
      Alert.alert(
        "Fill Fields",
        "Give at least search term and select a section"
      );
    }
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://10.4.6.44:8080/customer/search",
        {
          type: selectedSection.value,
          name: search.value,
          category: category.value || null,
          price: price.value || 3000000,
          streetName: street.value || null,
          localBody: localBody.value || null,
          city: city.value || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching data");
      console.error("Fetch Error:", error);
    }
  };

  if (data) {
    return (
      <Animated.View
        key={"NEWKey"}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(400)}
        style={{ flex: 1, height: "100%" }}
      >
        <SearchScreen data={data} isFavorite={true} icon={true} />
      </Animated.View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What are you looking for?</Text>
      <View style={styles.form}>
        <TextInputField
          value={search.value}
          onChangeText={handleInputChange(setSearch)}
          placeholder="Search Term"
          error={search.error}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInputField
          value={price.value}
          onChangeText={handleInputChange(setPrice)}
          placeholder="Enter Maximum Price"
          error={price.error}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
        <TextInputField
          value={localBody.value}
          onChangeText={handleInputChange(setLocalBody)}
          placeholder="Locality"
          error={localBody.error}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInputField
          value={street.value}
          onChangeText={handleInputChange(setStreet)}
          placeholder="Street Name"
          error={street.error}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInputField
          value={city.value}
          onChangeText={handleInputChange(setCity)}
          placeholder="City"
          error={city.error}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInputField
          value={category.value}
          onChangeText={handleInputChange(setCategory)}
          placeholder="Search Category"
          error={category.error}
          autoCapitalize="none"
          keyboardType="default"
        />
        <View style={styles.searchBar}>
          <SelectList
            setSelected={handleSectionSelect}
            data={sections}
            save="value"
            placeholder="Choose a section"
          />
        </View>
      </View>
      {selectedSection.value && search.value && localBody.value && (
        <Animated.View
          key={"uniqueKey"}
          entering={FadeIn.duration(2000)}
          exiting={FadeOut.duration(400)}
          style={styles.appDrawerIcon}
        >
          <Pressable onPress={fetchResults}>
            <Image
              source={require("../assets/search.png")}
              style={styles.appDrawerIcon}
            />
          </Pressable>
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    padding: 20,
  },
  appDrawerIcon: {
    height: 100,
    resizeMode: "contain",
    marginBottom: 100,
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 30,
  },
});
