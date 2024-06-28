import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomButton from "../components/Button";

const VendorProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.name}>Stevens</Text>
            <Text style={styles.email}>johnstevens@email.com</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=681%2C454",
              }}
            />
            <Text style={{ marginTop: 10 }}>Customer</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <CustomButton
            label="Manage Inventory"
            onPress={() => setView("inventory")}
          />
          <CustomButton
            label="View Products in Shop"
            onPress={() => setView("products")}
          />
          <CustomButton
            label="Logout"
            handlePress={() => Alert.alert("Edit Profile")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    // justifyContent: "space-around",
  },
  card: {
    padding: 16,
    borderColor: "#ccc",
    marginBottom: 30,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  profile: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    marginTop: 16,
    fontSize: 14,
    color: "gray",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  logout: {
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    // width: Dimensions.get("screen").width * 0.5,
    alignContent: "center",
  },
  buttons: {
    paddingHorizontal: 20,
    alignContent: "center",
    marginVertical: 20,
  },
  productImage: {
    width: 50,
    height: 50,
    marginTop: 8,
  },
});

export default VendorProfileScreen;

// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, FlatList, Alert } from "react-native";
// import ResultItem from "../components/ResultItem";

// const VendorProfileScreen = () => {
//   const [view, setView] = useState("profile");

//   const sampleProducts = [
//     {
//       id: "1",
//       name: "Sample Product 1",
//       category: "Category 1",
//       price: "19.99",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: "2",
//       name: "Sample Product 2",
//       category: "Category 2",
//       price: "29.99",
//       image: "https://via.placeholder.com/150",
//     },
//   ];

//   const renderItem = ({ item }) => (
//     <ResultItem
//       item={item}
//       onPress={() => Alert.alert("Product Pressed", item.name)}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       {view === "profile" && (
//         <View>
//           <Text style={styles.text}>This is the Profile Screen</Text>
//           <Button title="View Inventory" onPress={() => setView("inventory")} />
//           <Button
//             title="View Products in Shop"
//             onPress={() => setView("products")}
//           />
//         </View>
//       )}
//       {view === "inventory" && (
//         <View>
//           <Text style={styles.text}>Inventory Screen</Text>
//           <Button title="Back to Profile" onPress={() => setView("profile")} />
//           {/* Add your inventory management components here */}
//         </View>
//       )}
//       {view === "products" && (
//         <View style={styles.productContainer}>
//           <Text style={styles.text}>Products in Shop</Text>
//           <Button title="Back to Profile" onPress={() => setView("profile")} />
//           <FlatList
//             data={sampleProducts}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   productContainer: {
//     flex: 1,
//     width: "100%",
//     padding: 10,
//   },
// });

// export default VendorProfileScreen;
