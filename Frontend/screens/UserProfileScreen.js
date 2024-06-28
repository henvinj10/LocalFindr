import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserData = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.replace("Login");
    // product.color = selectedColor;
    // product.size = selectedSize;
    // // Add the product to the cart logic here
    // navigation.navigate("CART");
  };
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
      <View style={styles.logout}>
        <CustomButton
          label="Logout"
          handlePress={handleLogout}
        />
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
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  option: {
    alignItems: "center",
  },
  optionIcon: {
    width: 50,
    height: 50,
  },
  optionText: {
    marginTop: 8,
    fontSize: 16,
  },
  discoverSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  discoverText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productText: {
    fontSize: 16,
    marginVertical: 8,
  },
  moreButton: {
    backgroundColor: "#ff4757",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  moreButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logout: {
    alignItems: "center",
    width: "100%",
  },
  productImage: {
    width: 50,
    height: 50,
    marginTop: 8,
  },
});

export default UserData;

// import React from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import colors from "../constants/Colors";
// const UserData = ({ user }) => {
//   return (
//     <View style={styles.container}>
//       <View>
//         <Image
//           source={{
//             uri: "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
//           }}
//           style={styles.profileImage}
//         />
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.verifiedLabel}>Verified:</Text>
//         {true ? (
//           <MaterialIcons name="check-circle" size={24} color="blue" />
//         ) : (
//           <MaterialIcons name="cancel" size={24} color="red" />
//         )}
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Username:</Text>
//         <Text style={styles.value}>My Name</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Email:</Text>
//         <Text style={styles.value}>My Email</Text>
//       </View>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Created At:</Text>
//         <Text style={styles.value}>
//           My Date
//           {/* {new Date(user.created_at).toUTCString().slice(5, 16)} */}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     // borderWidth: 5,
//     // borderColor: colors.gray,
//     borderRadius: 5,
//   },
//   profileContainer: {
//     justifyContent: "center",
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginVertical: 25,
//   },
//   profileTextContainer: {
//     flex: 1,
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     fontWeight: "bold",
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   detailsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   label: {
//     flex: 1,
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   value: {
//     flex: 2,
//     fontSize: 18,
//     fontFamily: "System",
//   },
// });

// export default UserData;
