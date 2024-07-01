import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { isValidEmail, isAtLeast8Characters } from "../utils/Validations";
import TextInputField from "../components/TextInputField";
import colors from "../constants/Colors";
import CustomButton from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState({ value: "", valid: false, error: null });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
    error: null,
  });

  const handleLogin = () => {
    if (email.valid && password.valid) {
      userLogin();
    } else {
      Alert.alert("Incorrect data", "Please check your inputs");
    }
  };

  const userLogin = async () => {
    try {
      // Example login API request (adjust to your API structure)
      const response = await axios.post(`http://10.4.6.44:8080/auth/login`, {
        email: email.value,
        password: password.value,
      });

      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem("token", token);

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome!",
        });

        setTimeout(() => {
          try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.userType === "CUSTOMER") {
              navigation.replace("UserHomeTabs");
            } else {
              navigation.replace("VendorHomeTabs");
            }
          } catch (decodeError) {
            Alert.alert("Error", "Failed to decode token. Please try again.");
          }
        }, 1000);
      } else {
        Alert.alert(
          "Error",
          "User not found. Please check your email and try again."
        );
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "User not found") {
          Alert.alert(
            "Error",
            "User not found. Please check your email and try again."
          );
        } else {
          Alert.alert("Error", errorMessage || "Login failed");
        }
      } else {
        Alert.alert("Error", error.message || "Login failed");
      }
    }
  };

  const handleEmailChange = (text) => {
    if (!isValidEmail(text)) {
      setEmail({
        value: text,
        valid: false,
        error: "Please enter a valid Email",
      });
      return;
    }
    setEmail({ value: text, valid: true, error: null });
  };

  const handlePasswordChange = (text) => {
    if (!isAtLeast8Characters(text)) {
      setPassword({
        value: text,
        valid: false,
        error: "Password must be at least 8 characters",
      });
      return;
    }
    setPassword({ value: text, valid: true, error: null });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={require("../assets/app-name.png")}
        />
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <TextInputField
            value={email.value}
            error={email.error}
            icon="mail"
            placeholder="Enter your email"
            onChangeText={handleEmailChange}
          />
          <TextInputField
            value={password.value}
            error={password.error}
            placeholder="Enter your password"
            icon="lock-closed"
            secureTextEntry={!passwordVisible}
            toggleVisibility={() => setPasswordVisible(!passwordVisible)}
            onChangeText={handlePasswordChange}
          />
          <View style={styles.button}>
            <CustomButton label="Login" handlePress={handleLogin} />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.hyperLink}>Sign up here</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  image: {
    width: Dimensions.get("screen").width * 0.9,
    height: 250,
    resizeMode: "contain",
    marginTop: 30,
    alignSelf: "center",
    paddingHorizontal: 30,
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 15,
  },
  hyperLink: {
    color: "blue",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 15,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default LoginScreen;
