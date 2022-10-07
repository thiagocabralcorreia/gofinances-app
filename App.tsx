import React from "react";
import { StatusBar, LogBox } from "react-native";
import { Routes } from "./src/routes";
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
import { AuthProvider } from "./src/context/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  LogBox.ignoreLogs(["Remote debugger"]);
  const [loadedFont] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (loadedFont) {
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
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
