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
import { useState } from "react";
import {
  hasAtLeastOneDigit,
  hasAtLeastOneLowercase,
  hasAtLeastOneSpecialChar,
  hasAtLeastOneUppercase,
  isAtLeast8Characters,
  isEmpty,
  isValidEmail,
} from "../utils/Validations";
import TextInputField from "../components/TextInputField";
// import axios from "axios";
import Toast from "react-native-toast-message";
import colors from "../constants/Colors";
import { Picker } from "@react-native-picker/picker";

const RegistrationScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState({ value: "", valid: false, error: null });
  const [email, setEmail] = useState({ value: "", valid: false, error: null });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [userType, setUserType] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [buildingInfo, setBuildingInfo] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [streetName, setStreetName] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [villageOrMunicipality, setVillageOrMunicipality] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [city, setCity] = useState({ value: "", valid: false, error: null });
  const [district, setDistrict] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [state, setState] = useState({ value: "", valid: false, error: null });
  const [country, setCountry] = useState({
    value: "",
    valid: false,
    error: null,
  });
  const [gMapLink, setGMapLink] = useState({
    value: "",
    valid: false,
    error: null,
  });

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  handleNameChange = (text) => {
    if (isEmpty(text)) {
      setName({
        value: text,
        valid: false,
        error: "Please enter a valid name",
      });
      return;
    }
    setName({ value: text, valid: true, error: null });
  };

  handleEmailChange = (text) => {
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

  handlePasswordChange = (text) => {
    if (!isAtLeast8Characters(text)) {
      setPassword({
        value: text,
        valid: false,
        error: "Password must contain 8 characters",
      });
      return;
    }
    if (!hasAtLeastOneDigit(text)) {
      setPassword({
        value: text,
        valid: false,
        error: "Password must contain one digit",
      });
      return;
    }
    if (!hasAtLeastOneSpecialChar(text)) {
      setPassword({
        value: text,
        valid: false,
        error: "Password must contain one special symbol",
      });
      return;
    }
    if (!hasAtLeastOneLowercase(text)) {
      setPassword({
        value: text,
        valid: false,
        error: "Password must contain alphabets",
      });
      return;
    }
    if (!hasAtLeastOneUppercase(text)) {
      setPassword({
        value: text,
        valid: false,
        error: "Password must contain one uppercase",
      });
      return;
    }
    setPassword({ value: text, valid: true, error: null });
  };

  handleConfirmPasswordChange = (text) => {
    if (text !== password.value) {
      setConfirmPassword({
        value: text,
        valid: false,
        error: "Passwords does not match",
      });
      return;
    }
    setConfirmPassword({ value: text, valid: true, error: null });
  };

  const handleUserTypeChange = (itemValue) => {
    setUserType({ value: itemValue, valid: true, error: null });
  };

  handleBuildingInfoChange = (text) => {
    if (isEmpty(text)) {
      setBuildingInfo({
        value: text,
        valid: false,
        error: "Please enter valid building info",
      });
      return;
    }
    setBuildingInfo({ value: text, valid: true, error: null });
  };

  handleStreetNameChange = (text) => {
    if (isEmpty(text)) {
      setStreetName({
        value: text,
        valid: false,
        error: "Please enter a valid street name",
      });
      return;
    }
    setStreetName({ value: text, valid: true, error: null });
  };

  handleVillageOrMunicipalityChange = (text) => {
    if (isEmpty(text)) {
      setVillageOrMunicipality({
        value: text,
        valid: false,
        error: "Please enter a valid village or municipality",
      });
      return;
    }
    setVillageOrMunicipality({ value: text, valid: true, error: null });
  };

  handleCityChange = (text) => {
    if (isEmpty(text)) {
      setCity({
        value: text,
        valid: false,
        error: "Please enter a valid city",
      });
      return;
    }
    setCity({ value: text, valid: true, error: null });
  };

  handleDistrictChange = (text) => {
    if (isEmpty(text)) {
      setDistrict({
        value: text,
        valid: false,
        error: "Please enter a valid district",
      });
      return;
    }
    setDistrict({ value: text, valid: true, error: null });
  };

  handleStateChange = (text) => {
    if (isEmpty(text)) {
      setState({
        value: text,
        valid: false,
        error: "Please enter a valid state",
      });
      return;
    }
    setState({ value: text, valid: true, error: null });
  };

  handleCountryChange = (text) => {
    if (isEmpty(text)) {
      setCountry({
        value: text,
        valid: false,
        error: "Please enter a valid country",
      });
      return;
    }
    setCountry({ value: text, valid: true, error: null });
  };

  handleGMapLinkChange = (text) => {
    if (isEmpty(text)) {
      setGMapLink({
        value: text,
        valid: false,
        error: "Please enter a valid Google Map link",
      });
      return;
    }
    setGMapLink({ value: text, valid: true, error: null });
  };

  handleRegister = () => {
    if (
      name.valid &&
      email.valid &&
      password.valid &&
      confirmPassword.valid &&
      userType.valid &&
      buildingInfo.valid &&
      streetName.valid &&
      villageOrMunicipality.valid &&
      city.valid &&
      district.valid &&
      state.valid &&
      country.valid &&
      gMapLink.valid
    ) {
      registerUser();
    } else {
      Alert.alert("Incorrect data", "Please check your inputs");
    }
  };

  //   registerUser = async () => {
  //     try {
  //       const response = await axios.post(`${API_BASE_URL}/users/register`, {
  //         username: name.value,
  //         email: email.value,
  //         password: password.value,
  //         userType: userType.value,
  //         address: {
  //           buildingInfo: buildingInfo.value,
  //           streetName: streetName.value,
  //           villageOrMunicipality: villageOrMunicipality.value,
  //           city: city.value,
  //           district: district.value,
  //           state: state.value,
  //           country: country.value,
  //           gMapLink: gMapLink.value,
  //         },
  //       });

  //       Toast.show({
  //         type: "success",
  //         text1: "User registered successfully, Please verify your mail",
  //         position: "bottom",
  //       });

  //       setTimeout(() => {
  //         navigation.navigate("Login");
  //       }, 1000);
  //     } catch (error) {
  //       if (error.response) {
  //         Toast.show({
  //           type: "error",
  //           text1: error.response.data.message,
  //           position: "bottom",
  //         });
  //       } else {
  //         Toast.show({
  //           type: "error",
  //           text1: "Internal Server Error",
  //           position: "bottom",
  //         });
  //       }
  //     }
  //   };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("../assets/app-name.png")}
            resizeMode="center"
            style={styles.logo}
          />
          <Text style={styles.headerText}>Create Account</Text>
          {/* <TextInputField
            value={name.value}
            onChangeText={handleNameChange}
            placeholder="Name"
            error={name.error}
            autoCapitalize="words"
          /> */}
          <TextInputField
            value={email.value}
            onChangeText={handleEmailChange}
            placeholder="Email"
            error={email.error}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInputField
            value={password.value}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            error={password.error}
            secureTextEntry={!passwordVisible}
            onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
            passwordVisible={passwordVisible}
          />
          <TextInputField
            value={confirmPassword.value}
            onChangeText={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            error={confirmPassword.error}
            secureTextEntry={!passwordVisible}
            onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
            passwordVisible={passwordVisible}
          />
          {/* Dropdown for User Type */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select User Type</Text>
            <Picker
              selectedValue={userType.value}
              style={styles.picker}
              onValueChange={handleUserTypeChange}
            >
              <Picker.Item label="Consumer" value="Consumer" />
              <Picker.Item label="Vendor" value="Vendor" />
            </Picker>
            {userType.error && (
              <Text style={styles.errorText}>{userType.error}</Text>
            )}
          </View>
          {/* End of User Type Dropdown */}
          <TextInputField
            value={buildingInfo.value}
            onChangeText={handleBuildingInfoChange}
            placeholder="Building Info"
            error={buildingInfo.error}
          />
          <TextInputField
            value={streetName.value}
            onChangeText={handleStreetNameChange}
            placeholder="Street Name"
            error={streetName.error}
          />
          <TextInputField
            value={villageOrMunicipality.value}
            onChangeText={handleVillageOrMunicipalityChange}
            placeholder="Village or Municipality"
            error={villageOrMunicipality.error}
          />
          <TextInputField
            value={city.value}
            onChangeText={handleCityChange}
            placeholder="City"
            error={city.error}
          />
          <TextInputField
            value={district.value}
            onChangeText={handleDistrictChange}
            placeholder="District"
            error={district.error}
          />
          <TextInputField
            value={state.value}
            onChangeText={handleStateChange}
            placeholder="State"
            error={state.error}
          />
          <TextInputField
            value={country.value}
            onChangeText={handleCountryChange}
            placeholder="Country"
            error={country.error}
          />
          <TextInputField
            value={gMapLink.value}
            onChangeText={handleGMapLinkChange}
            placeholder="Google Map Link"
            error={gMapLink.error}
          />
          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
          <Pressable
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Log in
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  logo: {
    height: 100,
    width: 200,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
  },
  label: {
    flex: 1,

    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  loginButton: {
    marginVertical: 10,
  },
  loginButtonText: {
    fontSize: 15,
    color: colors.black,
  },
});

export default RegistrationScreen;
