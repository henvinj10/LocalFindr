import React from "react";
import { BackHandler, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../constants/Colors"; // Assuming this contains your color constants

const InventoryDetails = ({ route }) => {
    const { data } = route.params; // Assuming 'products' is passed as route params
    console.log(data);
    const navigation = useNavigation();

    // Function to handle toggling favorite status of a product
    const toggleFavorite = (item) => {
        // Your favorite toggle logic here
    };

    // Effect hook to handle hardware back press
    useFocusEffect(
        React.useCallback(() => {
            const handleBack = () => {
                navigation.goBack();
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", handleBack);

            return () => {
                BackHandler.removeEventListener("hardwareBackPress", handleBack);
            };
        }, [navigation])
    );

    // Function to render each product item
    const renderProduct = ({ item }) => (
        <ProductCard
            item={item}
            icon={false}
            toggleFavorite={toggleFavorite}
            onPress={() => navigation.navigate("ProductDetails", { productId: item.offeringID })}
        />
    );

    return (
        <LinearGradient
            colors={["#FDF0F3", colors.backgroundColor]} // Adjust gradient colors as needed
            style={styles.container}
        >
            <FlatList
                ListHeaderComponent={
                    <>
                        <Header handleBack={() => navigation.goBack()} />
                        <Tags />
                    </>
                }
                data={data} // Pass the products data to FlatList
                numColumns={2} // Number of columns in FlatList
                renderItem={renderProduct} // Render each product using renderProduct function
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                keyExtractor={(item) => item.offeringID.toString()} // Extract key from item
            />
        </LinearGradient>
    );
};

export default InventoryDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.backgroundColor, // Apply background color
    },
});
