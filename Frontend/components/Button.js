import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const CustomButton = ({ label, handlePress, color }) => {
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, color && { backgroundColor: color }]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#EBEBEB",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ad3939", // Default background color
  },
});
