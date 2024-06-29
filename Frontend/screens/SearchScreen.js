import React from "react";
import { BackHandler, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../constants/Colors";
import data from "../constants/data.json"; // Assuming this is where you import your data
import { Routes } from "../navigations/StackNavigator";


const SearchScreen = ({ data, isfavorite, icon }) => {
  var products = data; // Assuming you pass data as props
  const navigation = useNavigation();
  console.log(isfavorite)

  const toggleFavorite = (item) => {
    // Your favorite toggle logic here
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const handleBack = () => {
  //       navigation.replace("UserHomeTabs", Routes.Home);
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBack);

  //     return () => backHandler.remove();
  //   }, [navigation])
  // );

  const renderProduct = ({ item }) => (
    <ProductCard
      item={item}
      isFavorite={isfavorite}
      icon={icon}
      toggleFavorite={toggleFavorite}
      onPress={() => navigation.navigate("ProductDetails", { productId: item.offeringID })}
    />
  );

  return (
    <LinearGradient
      colors={["#FDF0F3", colors.backgroundColor]}
      style={styles.container}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <Header handleBack={() => navigation.goBack()} />
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.offeringID.toString()}
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
});
