import React from "react";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Register } from "./src/screens/Register";
import { StatusBar, LogBox } from "react-native";

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
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Register />
    </ThemeProvider>
  );
}
