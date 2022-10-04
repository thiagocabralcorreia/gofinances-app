import React, { useCallback, useState } from "react";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { addMonths, format, subMonths } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { currencyFormatter } from "../../utils/formatters";
import { categories } from "../../utils/categories";
import { TransactionProps } from "../../components/TransactionCard";
import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";

import {
  Container,
  Title,
  Header,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";

interface ICategory {
  key: string;
  name: string;
  total: number;
  formattedTotal: string;
  color: string;
  percent: string;
}

export const MonthlyChart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesTotal, setCategoriesTotal] = useState<ICategory[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const outflows = formattedResponse.filter(
      (outflow: TransactionProps) =>
        outflow.type === "negative" &&
        new Date(outflow.date).getMonth() === selectedDate.getMonth() &&
        new Date(outflow.date).getFullYear() === selectedDate.getFullYear()
    );

    const totalOutflows = outflows.reduce(
      (acumulattor: number, outflow: TransactionProps) => {
        return acumulattor + Number(outflow.amount);
      },
      0
    );
    const totalByCategory: ICategory[] = [];

    categories.forEach((category) => {
      let categoryTotal = 0;

      outflows.forEach((outflow: TransactionProps) => {
        if (outflow.category === category.key) {
          categoryTotal += Number(outflow.amount);
        }
      });

      if (categoryTotal > 0) {
        const percent = `${((categoryTotal / totalOutflows) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categoryTotal,
          formattedTotal: currencyFormatter(categoryTotal),
          color: category.color,
          percent,
        });
      }
    });
    setIsLoading(false);
    setCategoriesTotal(totalByCategory);
  };

  useFocusEffect(
    useCallback(() => {
      loadData().then();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Monthly Outflows</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name={"chevron-left"} />
            </MonthSelectButton>

            <Month>{format(selectedDate, "MMMM, yyyy")}</Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name={"chevron-right"} />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={categoriesTotal}
              y={"total"}
              x={"percent"}
              colorScale={categoriesTotal.map((category) => category.color)}
              labelRadius={100}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
            />
          </ChartContainer>

          {categoriesTotal.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.formattedTotal}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};
