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

const SearchScreen = () => {
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();
  const handleProductDetails = (item) => {
    navigation.navigate("Fade");
  };
  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          console.log("prod: ", prod);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBack);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBack);
      };
    }, [navigation])
  );

  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "UserHomeTabs" }],
    });
    return true;
  };

  return (
    <LinearGradient
      colors={["#FDF0F3", colors.backgroundColor]}
      style={styles.container}
    >
      {/* header */}

      {/* <Tags /> */}

      <FlatList
        ListHeaderComponent={
          <>
            <>
              <Header handleBack={handleBack} />
              <View>
                {/* <View style={styles.inputContainer}>
                  <TextInput placeholder="Search" style={styles.textInput} />
                </View> */}
              </View>
            </>
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <View>
        {/* <Text>HomeScreen</Text>
        <Text>HomeScreen</Text> */}
      </View>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },

  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    // fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    // fontFamily: "Poppins-Regular",
  },
});
