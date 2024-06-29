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
import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
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
  const [selectedSection, setSelectedSection] = useState({ value: "" });
  const [search, setsearch] = useState({ value: "", valid: false, error: null });
  const [localBody, setlocalBody] = useState({ value: "", valid: false, error: null });
  const [results, setShowResults] = useState(false);
  const [data, setData] = useState(null);

  const sections = [
    { key: "1", value: "Product" },
    { key: "2", value: "Service" },
    { key: "3", value: "All" },
  ];

  useFocusEffect(
    useCallback(() => {
      if (data) {
        const onBackPress = () => {
          setData(null);
          return true; // Prevent default behavior (navigating back)
        };

        BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }
    }, [data])
  );

  const handleSectionSelect = (val) => {
    setSelectedSection({ value: val.toUpperCase() });
  };

  const handlesearchChange = (text) => {
    if (isEmpty(text)) {
      setsearch({ value: text, valid: false, error: "Please enter a valid search" });
      return;
    }
    setsearch({ value: text, valid: true, error: null });
  };

  const handlelocalBodyChange = (text) => {
    if (isEmpty(text)) {
      setlocalBody({ value: text, valid: false, error: "Please enter a valid search" });
      return;
    }
    setlocalBody({ value: text, valid: true, error: null });
  };

  if (data) {
    return (
      <Animated.View
        key={"NEWKey"}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(400)}
        style={{ flex: 1, height: "100%" }}
      >
        <SearchScreen data={data} isfavorite={true} icon={true} />
      </Animated.View>
    );
  }

  const fetchData = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.post("http://10.4.6.44:8080/customer/search", {
        type: selectedSection.value,
        name: search.value,
        category: null,
        price: 3000000,
        streetName: null,
        localBody: null,
        city: null
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);

      const result = response.data;

      console.log("Data fetched successfully:", result);
      setData(result);
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching data");
      console.error("Fetch Error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What are you looking for?</Text>
      <View style={styles.form}>
        <TextInputField
          value={search.value}
          onChangeText={handlesearchChange}
          placeholder="Search Term"
          error={search.error}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInputField
          value={localBody.value}
          onChangeText={handlelocalBodyChange}
          placeholder="Locality"
          error={localBody.error}
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
          {/* <Pressable onPress={() => setShowResults(!results)}> */}
          <Pressable onPress={fetchData}>
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
