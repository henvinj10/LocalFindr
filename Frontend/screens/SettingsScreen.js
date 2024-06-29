import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };
  return (
    <View style={styles.container}>
      <CustomButton label="Logout" handlePress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default SettingsScreen;
