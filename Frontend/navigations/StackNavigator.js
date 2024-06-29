import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import VendorHomeScreen from "../screens/VendorHomeScreen";
import VendorProfileScreen from "../screens/VendorProfileScreen";
import { Image } from "react-native";
import UserHomeScreen from "../screens/UserHomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import InventoryDetails from "../screens/InventoryDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = {
  Home: "Home",
  Profile: "Profile",
  Settings: "Settings",
  Splash: "Splash",
  Start: "Start",
  Fade: "Fade",
  Login: "Login",
  Register: "Register",
  UserHomeTabs: "UserHomeTabs",
  VendorHomeTabs: "VendorHomeTabs",
  Search: "Search",
};

const getTabBarIcon = (route, color, size) => {
  let iconName;

  switch (route.name) {
    case Routes.Home:
      iconName = "home-outline";
      break;
    case Routes.Profile:
      iconName = "person-outline";
      break;
    case Routes.Settings:
      iconName = "settings-outline";
      break;
    default:
      iconName = "help";
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

function VendorBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        headerTitle: () => (
          <Image
            source={require("../assets/tab-bar.png")}
            style={{
              width: 250,
              height: 30,
              resizeMode: "contain",
            }}
          />
        ),
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#EE0F37",
          elevation: 0,
          marginHorizontal: 30,
          marginBottom: 20,
          borderRadius: 30,
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name={Routes.Home} component={VendorHomeScreen} />
      <Tab.Screen name={Routes.Profile} component={VendorProfileScreen} />
      <Tab.Screen name={Routes.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function UserBottomTabNavigator() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={Routes.Home}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        headerTitle: () => (
          <Image
            source={require("../assets/tab-bar.png")}
            style={{
              width: 250,
              height: 30,
              resizeMode: "contain",
            }}
          />
        ),
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#EE0F37",
          borderTopWidth: 0,
          elevation: 0,
          marginHorizontal: 30,
          marginBottom: 20,
          borderRadius: 30,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          position: "absolute",
        },
      })}
    >
      <Tab.Screen name={Routes.Home} component={UserHomeScreen} />
      <Tab.Screen name={Routes.Profile} component={UserProfileScreen} />
      <Tab.Screen name={Routes.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen
          name={Routes.Splash}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ProductDetails"}
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Register}
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.UserHomeTabs}
          component={UserBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.VendorHomeTabs}
          component={VendorBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Search}
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"InventoryDetails"}
          component={InventoryDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
