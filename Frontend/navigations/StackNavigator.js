// StackNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserHomeScreen from "../screens/UserHomeScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import VendorHomeScreen from "../screens/VendorHomeScreen";
import VendorProfileScreen from "../screens/VendorProfileScreen";
import LoginScreenSoft from "../screens/LoginScreenSoft";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function VendorBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.complementaryColor,
      })}
    >
      <Tab.Screen
        name="Home"
        component={VendorHomeScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen name="Profile" component={VendorProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
function UserBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.complementaryColor,
      })}
    >
      <Tab.Screen
        name="Home"
        component={UserHomeScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserHomeTabs"
          component={UserBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorHomeTabs"
          component={VendorBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
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
