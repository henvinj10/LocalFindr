import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { EvilIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import colors from "../constants/Colors";
import TextInputField from "../components/TextInputField";
import {
  hasAtLeastOneDigit,
  hasAtLeastOneLowercase,
  hasAtLeastOneSpecialChar,
  hasAtLeastOneUppercase,
  isAtLeast8Characters,
  isEmpty,
  isValidEmail,
} from "../utils/Validations";
import HomeScreen from "./UserHomeScreen";
import UserHomeScreen from "./UserHomeScreen";

const FadeTest = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState({
    value: "",
  });
  const logoOpacity = useSharedValue(0); // Shared value for logo opacity
  const [search, setsearch] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [localBody, setlocalBody] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [results, setShowResults] = useState(false);

  const sections = [
    { key: "1", value: "Products" },
    { key: "2", value: "Services" },
    { key: "3", value: "All" },
  ];

  // Function to handle section selection
  const handleSectionSelect = (val) => {
    setSelectedSection({ value: val });
    // Adjust logo opacity based on selection
    // logoOpacity.value = val === "All" ? 1 : 0;
  };

  handlesearchChange = (text) => {
    if (isEmpty(text)) {
      setsearch({
        value: text,
        valid: false,
        error: "Please enter a valid search",
      });
      return;
    }
    setsearch({ value: text, valid: true, error: null });
  };

  handlelocalBodyChange = (text) => {
    if (isEmpty(text)) {
      setlocalBody({
        value: text,
        valid: false,
        error: "Please enter a valid search",
      });
      return;
    }
    setlocalBody({ value: text, valid: true, error: null });
  };

  if (results) {
    return (
      <Animated.View
        key={"NEWKey"}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(400)}
        style={{ flex: 1, height: "100%" }}
      >
        <UserHomeScreen />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you looking for?</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SelectList
            setSelected={(val) => handleSectionSelect(val)}
            data={sections}
            save="value"
            placeholder="Choose a section"
          />
        </View>
      </View>
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

      {/* Logo to fade in/out */}
      {selectedSection.value && search.value && localBody.value && (
        <Animated.View
          key={"uniqueKey"}
          entering={FadeIn.duration(2000)}
          exiting={FadeOut.duration(400)}
          style={styles.appDrawerIcon}
        >
          <Pressable onPress={() => setShowResults(!results)}>
            <Image
              source={require("../assets/search.png")}
              style={styles.appDrawerIcon}
            />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

export default FadeTest;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    padding: 20,
  },
  appDrawerIcon: {
    height: 100,
    resizeMode: "contain",
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
    width: Dimensions.get("screen").width,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBar: {
    height: 150,
    width: "100%",
    borderRadius: 5,
    // paddingHorizontal: 10,
    // marginLeft: 10,
    justifyContent: "center",
  },
});
