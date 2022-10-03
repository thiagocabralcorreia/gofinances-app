import React, { useEffect, useState } from "react";
import { TransactionProps } from "../../components/TransactionCard";
import { HistoryCard } from "../../components/HistoryCard";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLLECTION_TRANSACTIONS } from "../../config/database";
// import { categories } from "../../utils/categories";
import { Container, Title, Header, Content } from "./styles";

interface Props extends TransactionProps {}
interface ICategory {
  key: string;
  name: string;
  total: string;
  color: string;
}

export const MonthlyChart = () => {
  const [categoriesTotal, setCategoriesTotal] = useState<ICategory[]>([]);

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
