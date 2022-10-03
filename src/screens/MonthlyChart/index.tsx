import React, { useEffect, useState } from "react";
import { TransactionProps } from "../../components/TransactionCard";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { currencyFormatter } from "../../utils/formatters";
import { categories } from "../../utils/categories";

import { Container, Title, Header, Content } from "./styles";

interface ICategory {
  key: string;
  name: string;
  total: string;
  color: string;
}

export const MonthlyChart = () => {
  const [categoriesTotal, setCategoriesTotal] = useState<ICategory[]>([]);

  const loadData = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const outflows = formattedResponse.filter(
      (outflow: TransactionProps) => outflow.type === "negative"
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
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: currencyFormatter(categoryTotal),
          color: category.color,
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
        {categoriesTotal.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
};
