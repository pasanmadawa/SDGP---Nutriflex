import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createSwitchNavigator } from "@react-navigation/native";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUp";
import Customization_1 from "./src/screens/Customization_1";
import Customization_2 from "./src/screens/Customization_2";
import Customization_3 from "./src/screens/Customization_3";
import HomeScreen from "./src/screens/HomeScreen";
import MainContainer from "./src/screens/CustomNavigationBar";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initalRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Custom_1" component={Customization_1} />
        <Stack.Screen name="Custom_2" component={Customization_2} />
        <Stack.Screen name="Custom_3" component={Customization_3} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Navigation" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
