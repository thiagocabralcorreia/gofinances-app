import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { MonthlyChart } from "../screens/MonthlyChart";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 10,
          height: 80,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.regular,
        },
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name={"format-list-bulleted"}
              size={size}
              color={color}
            />
          ),
        }}
        name={"List"}
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={"attach-money"} size={size} color={color} />
          ),
        }}
        name={"Register"}
        component={Register}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={"pie-chart"} size={size} color={color} />
          ),
        }}
        name={"Chart"}
        component={MonthlyChart}
      />
    </Navigator>
  );
};
