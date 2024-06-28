import { StyleSheet, Pressable, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TextInputField = ({
  value,
  error,
  icon,
  placeholder,
  keyboardType,
  maxLength,
  onChangeText,
  secureTextEntry,
  toggleVisibility,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, error && styles.errorInputContainer]}
      >
        {icon && <Ionicons name={icon} size={24} color="#000000" />}
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#8d8d8d"
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {toggleVisibility && (
          <Pressable onPress={toggleVisibility}>
            {secureTextEntry ? (
              <Ionicons name="eye-off-outline" size={24} color="#000000" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="#000000" />
            )}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e7e2e2", // Dark background color
    borderRadius: 6,
    elevation: 5,
  },
  errorInputContainer: {
    borderWidth: 1,
    borderColor: "red",
    elevation: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    color: "#222121", // Text color in dark mode
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});
