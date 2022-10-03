import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { currencyFormatter } from "../../utils/formatters";
import { categories } from "../../utils/categories";
import { TransactionProps } from "../../components/TransactionCard";
import { HistoryCard } from "../../components/HistoryCard";

import { Container, Title, Header, Content, ChartContainer } from "./styles";

interface ICategory {
  key: string;
  name: string;
  total: number;
  formattedTotal: string;
  color: string;
  percent: string;
}

export const MonthlyChart = () => {
  const [categoriesTotal, setCategoriesTotal] = useState<ICategory[]>([]);
  const theme = useTheme();

  const loadData = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const outflows = formattedResponse.filter(
      (outflow: TransactionProps) => outflow.type === "negative"
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

    setCategoriesTotal(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Monthly Chart</Title>
      </Header>

      <Content>
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
    </Container>
  );
};
