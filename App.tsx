import React from "react";
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";
import "intl";
import "intl/locale-data/jsonp/en-GB";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { SignIn } from "./src/screens/SignIn";

SplashScreen.preventAutoHideAsync();

export default function App() {
  LogBox.ignoreLogs(["Remote debugger"]);
  const [loadedFont] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (loadedFont) {
    // This tells the splash screen to hide immediately
    SplashScreen.hideAsync();
  }
  if (!loadedFont) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <SignIn />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </ThemeProvider>
  );
}
