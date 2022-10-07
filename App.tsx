import React from "react";
import { StatusBar, LogBox } from "react-native";
import { Routes } from "./src/routes";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";
import "intl";
import "intl/locale-data/jsonp/en-GB";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { AuthProvider, useAuth } from "./src/context/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { storedUserIsLoading } = useAuth();

  LogBox.ignoreLogs(["Remote debugger"]);
  const [loadedFont] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!loadedFont || storedUserIsLoading) {
    return <AppLoading />;
  }

  if (loadedFont) {
    SplashScreen.hideAsync();
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
