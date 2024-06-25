import { StatusBar, StyleSheet, View } from "react-native";
// import {store} from './store';
// import {Provider} from 'react-redux';
import StackNavigator from "./navigations/StackNavigator";
import Toast from "react-native-toast-message";
import colors from "./constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {
  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StackNavigator />
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.primaryColor}
        />
        <Toast />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default App;
