import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import TextInputField from "../components/TextInputField";
import ResultItem from "../components/ResultItem";
import ProductCard from "../components/ProductCard";

export default function SearchScreen({ route }) {
  const { section } = route.params;
  const [name, setName] = useState({ value: "", valid: false, error: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([
    { id: "1", title: `Result 1 in ${section}` },
    { id: "2", title: `Result 2 in ${section}` },
    { id: "3", title: `Result 3 in ${section}` },
  ]);

  const data = [
    {
      offeringID: "45t4t454",
      name: "Product 1",
      type: "Product",
      category: "Category 1",
      description: "Description of Product 1",
      price: 100,
      image: "https://example.com/product1.jpg",
      isAvailable: true,
      availableTime: "9 AM - 5 PM",
    },
    {
      offeringID: "45t4t455",
      name: "Product 1",
      type: "Product",
      category: "Category 1",
      description: "Description of Product 1",
      price: 100,
      image: "https://example.com/product1.jpg",
      isAvailable: true,
      availableTime: "9 AM - 5 PM",
    },
    {
      offeringID: "45t4t456",
      name: "Product 1",
      type: "Product",
      category: "Category 1",
      description: "Description of Product 1",
      price: 100,
      image: "https://example.com/product1.jpg",
      isAvailable: true,
      availableTime: "9 AM - 5 PM",
    },
  ];

  const handleNameChange = (text) => {
    if (text.trim().length === 0) {
      setName({
        value: text,
        valid: false,
        error: "Please enter a valid name",
      });
      return;
    }
    setName({ value: text, valid: true, error: null });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setResults([
      { id: "1", title: `Result 1 in ${section}` },
      { id: "2", title: `Result 2 in ${section}` },
      { id: "3", title: `Result 3 in ${section}` },
    ]);
  }, [section]);

  return (
    <View style={styles.container}>
      <SharedElement id="searchIcon">
        <TextInputField
          placeholder={`Search in ${section}...`}
          error={!!name.error}
          value={name.value}
          onChangeText={handleNameChange}
        />
      </SharedElement>
      <FlatList
        style={styles.resultsContainer}
        data={data}
        renderItem={({ item }) => (
          // <ResultItem item={item} onPress={() => console.log(item)} />
          <ProductCard item={item} onPress={() => console.log(item)} />
        )}
        keyExtractor={(item) => item.offeringID}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultsContainer: {
    paddingTop: 20,
  },
});
