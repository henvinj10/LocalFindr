import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomSearchBar from "./SearchBar";

const Header = ({ handleBack }) => {
  const [search, setSearch] = useState({ value: "" });

  updateSearch = (search) => {
    setSearch({ value: search });
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <View>
      <CustomSearchBar onSearch={handleSearch} />
      {/* <TouchableOpacity style={styles.appDrawerContainer} onPress={handleBack}>
        <EvilIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appDrawerIcon: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 44,
    width: 44,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 28,
    // fontFamily: fonts.regular,
    color: "#000000",
  },
});
