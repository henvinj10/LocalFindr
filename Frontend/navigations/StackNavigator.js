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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = {
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
      iconName = "home";
      break;
    case Routes.Profile:
      iconName = "person";
      break;
    case Routes.Settings:
      iconName = "settings";
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
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: colors.primaryColor,
        tabBarBackgroundColor: colors.primaryColor,
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
      initialRouteName={Routes.Home}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: colors.primaryColor,
        tabBarBackgroundColor: colors.primaryColor,
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
      <Stack.Navigator initialRouteName={Routes.Splash}>
        <Stack.Screen
          name={Routes.Splash}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Start}
          component={SplashScreen}
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
          sharedElements={(route) => {
            return [{ id: "searchIcon" }];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
