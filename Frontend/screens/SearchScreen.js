import {
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../constants/data.json";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../constants/Colors";

const SearchScreen = ({ navigation }) => {
  const backNavigation = useNavigation();
  const [products, setProducts] = useState(data.products);

  const handleProductDetails = (item) => {
    navigation.navigate("ProductDetails", { item });
  };

  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  const handleBack = () => {
    backNavigation.reset({
      index: 0,
      routes: [{ name: "UserHomeTabs" }],
    });
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBack);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBack);
      };
    }, [navigation])
  );

  return (
    <LinearGradient
      colors={["#FDF0F3", colors.backgroundColor]}
      style={styles.container}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <Header handleBack={handleBack} />
            <View style={styles.inputContainer}>
              <TextInput placeholder="Search" style={styles.textInput} />
            </View>
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={() => handleProductDetails(item)}
            toggleFavorite={() => toggleFavorite(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    fontSize: 18,
    flex: 1,
  },
});
