import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Pressable } from "react-native";

const CustomSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search another keyword"
        value={query}
        onChangeText={setQuery}
      />
      <Pressable onPress={handleSearch}>
        <Ionicons name="search" size={24} color="#000000" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    // marginTop: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF", // Dark background color
    borderRadius: 6,
  },
  textInput: {
    flex: 1,
    color: "#2B2B2B", // Text color in dark mode
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default CustomSearchBar;
