import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  SubHeader,
  TrashButton,
  TrashIcon,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expensive: HighLightProps;
  total: HighLightProps;
}

export const Dashboard = () => {
  const [data, setData] = useState<DataListProps[]>([]);

  const loadTransactions = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const formattedTransactions: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        });

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: item.date,
        };
      }
    );

    setData(formattedTransactions);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/74374833?v=4",
              }}
            />
            <User>
              <UserGreeting>Hi, </UserGreeting>
              <UserName>Thiago</UserName>
            </User>
          </UserInfo>
          <LogoutButton>
            <Icon name={"power"} />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type={"up"}
          title={"Inflows"}
          amount={"£ 00.00"}
          lastTransaction={"Last cash inflow on April 13th"}
        />
        <HighlightCard
          type={"down"}
          title={"Outflows"}
          amount={"£ 00.00"}
          lastTransaction={"Last cash outflow on April 13th"}
        />
        <HighlightCard
          type={"total"}
          title={"Total"}
          amount={"£ 00.00"}
          lastTransaction={"1st to 13th of April"}
        />
      </HighlightCards>
      <Transactions>
        <SubHeader>
          <Title>List</Title>
          {data.length > 0 && (
            <TrashButton
            // onPress={handleClearTransactions}
            >
              <TrashIcon name={"trash"} />
            </TrashButton>
          )}
        </SubHeader>

        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id + uuid.v4()}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
