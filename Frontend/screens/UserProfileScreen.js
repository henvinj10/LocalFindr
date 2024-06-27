import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/Colors";
const UserData = ({ user }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.verifiedLabel}>Verified:</Text>
        {true ? (
          <MaterialIcons name="check-circle" size={24} color="blue" />
        ) : (
          <MaterialIcons name="cancel" size={24} color="red" />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>My Name</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>My Email</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.value}>
          My Date
          {/* {new Date(user.created_at).toUTCString().slice(5, 16)} */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    // borderWidth: 5,
    // borderColor: colors.gray,
    borderRadius: 5,
  },
  profileContainer: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 25,
  },
  profileTextContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  value: {
    flex: 2,
    fontSize: 18,
    fontFamily: "System",
  },
});

export default UserData;
