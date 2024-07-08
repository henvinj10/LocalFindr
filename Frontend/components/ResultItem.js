import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ResultItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginLeft: 10,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 14,
    color: "#000",
  },
});

export default ResultItem;
