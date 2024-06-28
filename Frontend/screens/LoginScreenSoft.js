import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Input } from "../components/Input";

const LoginScreenSoft = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Input
        id="username"
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        style={styles.input}
        primary
      />
      <Input
        id="password"
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        style={styles.input}
        secureTextEntry
        secondary
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  input: {
    marginBottom: 16,
  },
});

export default LoginScreenSoft;
