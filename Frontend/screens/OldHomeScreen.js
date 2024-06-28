import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

const HomeScreen = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState("All");

  const sections = [
    { key: "1", value: "Products" },
    { key: "2", value: "Services" },
    { key: "3", value: "All" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable onPress={() => navigation.navigate("Map")}>
          <EvilIcons name="search" size={30} color="black" />
        </Pressable>
        <View style={styles.searchBar}>
          <SelectList
            setSelected={(val) => setSelectedSection(val)}
            data={sections}
            save="value"
            placeholder="Choose a section"
          />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search", { section: selectedSection })
          }
        >
          <SharedElement id="searchIcon">
            <EvilIcons name="share-apple" size={30} color="black" />
          </SharedElement>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
});

export default HomeScreen;
