import React, { useState } from "react";
import {
  Alert,
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

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState({ value: "", valid: false, error: null });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
    error: null,
  });

  // Your API_BASE_URL setup (adjust based on your environment)
  const API_BASE_URL = "your_api_base_url_here";

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
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const token = await response.json();
      // Store token using AsyncStorage or other storage method
      // Example: AsyncStorage.setItem("token", token);

      // Example Toast message (adjust as needed)
      Alert.alert("Login Successful", "Welcome!");
      setTimeout(() => {
        navigation.replace("Main");
      }, 1000);
    } catch (error) {
      Alert.alert("Error", error.message || "Login failed");
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
          <View style={styles.forgotPassword}>
            <Pressable
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={[styles.signUpText, styles.signUpLink]}>
                Sign up here
              </Text>
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
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 30,
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
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
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
    fontSize: 16,
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: "bold",
    marginLeft: 5,
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
