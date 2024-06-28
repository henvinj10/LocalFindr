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
import { useEffect, useState } from "react";
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
import colors from "../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import CustomButton from "../components/Button";

const RegistrationScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [name, setName] = useState({ value: "", valid: false, error: null });
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
    value: "CUSTOMER",
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
  const [localBody, setlocalBody] = useState({
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
    // console.log(email.value);
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
    // console.log(password.value);
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

  useEffect(() => {
    console.log(userType);
  }, [userType]);

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

  handlelocalBodyChange = (text) => {
    if (isEmpty(text)) {
      setlocalBody({
        value: text,
        valid: false,
        error: "Please enter a valid village or municipality",
      });
      return;
    }
    setlocalBody({ value: text, valid: true, error: null });
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
    console.log(email.value);
    console.log(password.value);
    console.log(userType.value);
    if (email.valid && password.valid && userType.value === "CUSTOMER") {
      console.log("Customer registration");
      registerCustomer();
    } else if (
      userType.value === "VENDOR" &&
      confirmPassword.valid &&
      buildingInfo.valid &&
      streetName.valid &&
      localBody.valid &&
      city.valid &&
      district.valid &&
      state.valid &&
      country.valid &&
      gMapLink.valid
    ) {
      console.log("Vendor registration");
      registerVendor();
    } else {
      Alert.alert("Incorrect data", "Please check your inputs");
    }
  };

  registerCustomer = async () => {
    try {
      // const response = await axios.post(`http://10.4.6.44:8080/auth/register`
      const response = await axios.post(`http://10.4.6.44:8080/auth/register`, {
        email: email.value,
        password: password.value,
        userType: userType.value,
        address: {},
      });

      Toast.show({
        type: "success",
        text1: "User registered successfully, Please verify your mail",
        position: "bottom",
      });

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    } catch (error) {
      if (error.response) {
        // Toast.show({
        //   type: "error",
        //   text1: error.response.data.message,
        //   position: "bottom",
        // });
        // console.log(error.response);
      } else {
        // Toast.show({
        //   type: "error",
        //   text1: "Internal Server Error",
        //   position: "bottom",
        // });
        console.log("error 2");
      }
    }
  };

  registerVendor = async () => {
    try {
      const response = await axios.post(`http://10.4.6.44:8080/auth/register`, {
        email: email.value,
        password: password.value,
        userType: userType.value,
        address: {
          buildingInfo: buildingInfo.value,
          streetName: streetName.value,
          localBody: localBody.value,
          city: city.value,
          district: district.value,
          state: state.value,
          country: country.value,
          gmapLink: gMapLink.value,
        },
      });

      Toast.show({
        type: "success",
        text1: "User registered successfully, Please verify your mail",
        position: "bottom",
      });

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: error.response.data.message,
          position: "bottom",
        });
        console.log(error.response);
      } else {
        Toast.show({
          type: "error",
          text1: "Internal Server Error",
          position: "bottom",
        });
        console.log("error 2");
      }
    }
  };

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
              <Picker.Item label="Customer" value="CUSTOMER" />
              <Picker.Item label="Vendor" value="VENDOR" />
            </Picker>
            {userType.error && (
              <Text style={styles.errorText}>{userType.error}</Text>
            )}
          </View>
          {/* End of User Type Dropdown */}
          {userType.value === "VENDOR" && (
            <>
              <TextInputField
                label="Building Information"
                placeholder="Enter building info"
                value={buildingInfo.value}
                onChangeText={handleBuildingInfoChange}
                errorMessage={buildingInfo.error}
              />
              <TextInputField
                label="Street Name"
                placeholder="Enter street name"
                value={streetName.value}
                onChangeText={handleStreetNameChange}
                errorMessage={streetName.error}
              />
              <TextInputField
                label="Village or Municipality"
                placeholder="Enter village or municipality"
                value={localBody.value}
                onChangeText={handlelocalBodyChange}
                errorMessage={localBody.error}
              />
              <TextInputField
                label="City"
                placeholder="Enter city"
                value={city.value}
                onChangeText={handleCityChange}
                errorMessage={city.error}
              />
              <TextInputField
                label="District"
                placeholder="Enter district"
                value={district.value}
                onChangeText={handleDistrictChange}
                errorMessage={district.error}
              />
              <TextInputField
                label="State"
                placeholder="Enter state"
                value={state.value}
                onChangeText={handleStateChange}
                errorMessage={state.error}
              />
              <TextInputField
                label="Country"
                placeholder="Enter country"
                value={country.value}
                onChangeText={handleCountryChange}
                errorMessage={country.error}
              />
              <TextInputField
                label="Google Map Link"
                placeholder="Enter Google Map link"
                value={gMapLink.value}
                onChangeText={handleGMapLinkChange}
                errorMessage={gMapLink.error}
              />
            </>
          )}
          <View style={styles.button}>
            <CustomButton label="Create Account" handlePress={handleRegister} />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginButtonText}>
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.hyperLink}>Log in</Text>
            </Pressable>
          </View>
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
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  hyperLink: {
    color: "blue",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 15,
  },
  loginButtonText: {
    fontSize: 15,
    color: colors.black,
  },
});

export default RegistrationScreen;
