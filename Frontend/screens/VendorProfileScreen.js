import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Alert } from "react-native";
import ResultItem from "../components/ResultItem";

const VendorProfileScreen = () => {
  const [view, setView] = useState("profile");

  const sampleProducts = [
    {
      id: "1",
      name: "Sample Product 1",
      category: "Category 1",
      price: "19.99",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Sample Product 2",
      category: "Category 2",
      price: "29.99",
      image: "https://via.placeholder.com/150",
    },
  ];

  const renderItem = ({ item }) => (
    <ResultItem
      item={item}
      onPress={() => Alert.alert("Product Pressed", item.name)}
    />
  );

  return (
    <View style={styles.container}>
      {view === "profile" && (
        <View>
          <Text style={styles.text}>This is the Profile Screen</Text>
          <Button title="View Inventory" onPress={() => setView("inventory")} />
          <Button
            title="View Products in Shop"
            onPress={() => setView("products")}
          />
        </View>
      )}
      {view === "inventory" && (
        <View>
          <Text style={styles.text}>Inventory Screen</Text>
          <Button title="Back to Profile" onPress={() => setView("profile")} />
          {/* Add your inventory management components here */}
        </View>
      )}
      {view === "products" && (
        <View style={styles.productContainer}>
          <Text style={styles.text}>Products in Shop</Text>
          <Button title="Back to Profile" onPress={() => setView("profile")} />
          <FlatList
            data={sampleProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
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
    marginBottom: 20,
  },
  productContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});

export default VendorProfileScreen;
