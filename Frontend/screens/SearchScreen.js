import React from "react";
import { BackHandler, FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProductCard from "../components/ProductCard";
import colors from "../constants/Colors";

const SearchScreen = ({ data, isFavorite, icon, navigation }) => {
  var products = data;
  // const navigation = useNavigation();

  const renderProduct = ({ item }) => (
    <ProductCard
      item={item}
      isFavorite={isFavorite}
      icon={icon}
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: item.offeringID })
      }
    />
  );

  return (
    <LinearGradient
      colors={["#FDF0F3", colors.backgroundColor]}
      style={styles.container}
    >
      {products && products.length > 0 ? (
        <FlatList
          data={products}
          numColumns={2}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.offeringID.toString()}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
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
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: colors.text,
  },
});
