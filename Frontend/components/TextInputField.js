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
    <View>
      <View
        style={[styles.inputContainer, error && styles.errorInputContainer]}
      >
        {icon && <Ionicons name={icon} size={24} color="#FFFFFF" />}
        <TextInput
          style={[styles.textInput, { color: "#FFFFFF" }]}
          placeholderTextColor="#9e9e9e"
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
              <Ionicons name="eye-off-outline" size={24} color="#FFFFFF" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="#FFFFFF" />
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
  inputContainer: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333333", // Dark background color
    borderRadius: 6,
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
    color: "#FFFFFF", // Text color in dark mode
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
});
